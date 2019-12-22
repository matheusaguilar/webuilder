const fs = require('fs');
const pagesMeta = require('../../pages.config.js');
const pagesLocation = '/src/pages';
const layoutLocation = '/src/layouts/';

function EntryPlugin(options) {
  this.mode = options.mode;
  this.basepath = options.basepath;
  this.srcPath = this.basepath + '/build/src/'
  this.dirList = [];
  this.entry = [];
}

var fix_execute = true;
var fix_aux = true;

function log(val){
  console.log('%s\x1b[0m', `\x1b[34mi \x1b[35m[EntryPlugin]:\x1b[0m ${val}`); 
}

EntryPlugin.prototype.apply = function (compiler) {

  var obj = this;
  var timeIni;
  var timeFim;

  compiler.plugin('beforeCompile', function () {

    if (fix_execute){
      timeIni = new Date().getMilliseconds();

      log('loading...');

      //clear list for hot reload
      obj.dirList = [];

      //delete old files
      deleteFolderFiles(obj.srcPath);
      deleteFolderFiles(obj.basepath + '/dist', true);
      deleteFolderFiles(obj.basepath + '/dist/bundle');

      //create build/src folder
      if (!fs.existsSync(obj.srcPath)) {
        fs.mkdirSync(obj.srcPath);
      }
      //create dist and dist/bundle folder
      if (!fs.existsSync(obj.basepath + '/dist/bundle')) {
        fs.mkdirSync(obj.basepath + '/dist/bundle');
      }

      //log("old files cleaned...");

      //read files
      readDirFiles(obj, obj.basepath + pagesLocation + '/', '/')
      .catch(function(e){
        log(e.message + '\nOccurred at plugin in readDirFiles call');
        process.exit();
      });

      //remove home of pages '/'
      obj.dirList.pop();

      //validate index.vue
      var validate = true;
      obj.dirList.forEach(function (vector) {
        if (validate) {
          validate = false;
          vector.forEach(function (file) {
            if (file == 'index.vue' || file == '_index.vue') {
              validate = true;
            }
          });
          if (!validate) {
            console.trace('> error: EntryPlugin needs a index.vue or _index.vue inside each folder in pages');
            process.exit();
          }
        }
      });

      //log("vue files read and validated...");

      //create files js
      var indexList = createArquivosJS(obj);

      //log("js files created in /build/src folder...");

      //create html files
      createHTML(obj, obj.basepath + '/dist/', indexList);

      //log("html files created in /dist folder...");

      timeFim = new Date().getMilliseconds() - timeIni;
      log('end (' + timeFim + ' ms)\n');

      if (fix_aux){
        fix_execute = false;
      }

    } else{
      if (fix_aux){
        fix_execute = true;
        fix_aux = false;
      }
    }

  });

};

async function readDirFiles(obj, path, current) {
  var fileList = [];
  fileList.push(current);

  fs.readdirSync(path).forEach(function (file) {
    if (fs.lstatSync(path + file).isFile()) {
      fileList.push(file);
    } else {
      readDirFiles(obj, path + file + '/', current + file + '/')
      .catch(function(e){
        log(e.message + '\nOccurred at readDirFiles in readDirFiles call');
        process.exit();
      });
    }
  });

  obj.dirList.push(fileList);
}

async function deleteFolderFiles(directory, isHtml){
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach(function (file) {
      var curPath = directory + "/" + file;
      if (!fs.lstatSync(curPath).isDirectory()) {
        if (isHtml){
          if (file.includes('.html')){
            fs.unlinkSync(curPath);
          }
        } else{
          fs.unlinkSync(curPath);
        }
      }
    });
  }
}

function createArquivosJS(obj) {
  var vec;
  var path;
  var layout;
  var indexList = [];

  for (var i = 0; i < obj.dirList.length; i++) {
    vec = obj.dirList[i];
    path = vec[0];
    vec.shift();
    indexList.push(path);

    //check layout
    layout = pagesMeta.DEFAULT_LAYOUT;
    if (!!pagesMeta.get(path)){
      if (!!pagesMeta.get(path).layout){
        layout = pagesMeta.get(path).layout;
      }
    }
    if (!fs.existsSync(obj.basepath + layoutLocation + layout)) {
      console.trace('> error: EntryPlugin layout doesnt exists (' + layout + ') for path: ' + path);
      process.exit();
    }

    //create index.js file
    createJS(obj.srcPath, path, createIndexFile(obj.basepath, layout, path, vec))
    .catch(function(e){
      log(e.message + '\nOccurred at createArquivosJS in createJS call');
      process.exit();
    });
  }

  return indexList;
}

async function createJS(srcpath, path, data) {
  fs.writeFileSync(srcpath + replacePath(path) + 'index.ts', data);
}

function createIndexFile(basepath, layout, path, files) {
  var txt = '';
  var baseReplaced = basepath.replace(/\\/g, '/');

  // JS
  // txt += 'import Layout from "' + baseReplaced + layoutLocation + layout + '";\n';
  // txt += 'import Error404 from "' + baseReplaced + pagesLocation + '/' + path.split('/')[1] + '/error404.vue";\n';
  // txt += getImports(baseReplaced, path, files);
  // txt += 'Vue.config.productionTip = false;\n';
  // txt += 'const router = new VueRouter({\n' +
  //   'routes: [' + getRoutes(files) + '\n]});';
  // txt += '\nnew Vue({ router, render: function(createElement){return createElement(Layout)}}).$mount("#app");'

  //TS
  txt += `
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  // @ts-ignore
  import Layout from '${baseReplaced + layoutLocation + layout}';
  // @ts-ignore
  import Error404 from '${baseReplaced + pagesLocation + '/' + path.split('/')[1] + '/error404.vue'}';
  ${getImports(baseReplaced, path, files)}

  Vue.config.productionTip = false;
  Vue.use(VueRouter);

  const router = new VueRouter({routes: [${getRoutes(files)}]});

  new Vue({
    el: "#app",
    router: router,
    render: h => h(Layout)
  });
  `;

  return txt;
}

function getImports(baseReplaced, path, files){
  var txt= '';

  files.forEach(function (file, index) {
    if (file == 'index.vue') {
      txt+= '// @ts-ignore\n'; // ts
      txt+= 'import Index from "' + baseReplaced + pagesLocation + path + 'index.vue";\n';

    } else if (file == '_index.vue'){
      txt+= '// @ts-ignore\n'; // ts
      txt+= 'import Index from "' + baseReplaced + pagesLocation + path + '_index.vue";\n';

    } else if (file != 'error404.vue'){
      txt+= '// @ts-ignore\n'; // ts
      var fileName = file;
      if (fileName.charAt(0) == '_'){
        fileName = fileName.substring(1);
      }
      txt+= 'import '+ (fileName.charAt(0).toUpperCase() + getNameLower(fileName).substring(1)) +
      ' from "' + baseReplaced + pagesLocation + path + file + '";\n';
    }
  });

  return txt;
}

function getRoutes(files) {
  var txt = '';

  files.forEach(function (file, index) {
    if (file == 'index.vue') {
      txt += '\n{ path: "/", component: Index}';
      txt += ',';
    } else if (file == '_index.vue'){
      txt += '\n{ path: "/:id", component: Index}'
      txt += ',';

    } else if (file != 'error404.vue') {
      var filePath = getNameLower(file);
      var fileName = file;
      if (file.charAt(0) == '_'){
        fileName = fileName.substring(1);
        filePath = filePath.substring(1) + '/:id';
      }
      txt += '\n{ path: "/' + filePath + '", component: ' + (fileName.charAt(0).toUpperCase() + getNameLower(fileName).substring(1)) + '}';
      txt += ',';
      // ajax import
      // txt += '\n{ path: "/' + getNameLower(file) + '",' +
      //   ' component: () => import(/* webpackChunkName: "' + replacePath(path) + getNameLower(file) + '" */ "' + basepath +  pagesLocation + path + file + '")}'
    }
  });
  //Error404 page
  txt+= '\n{ path: "*", component: Error404}';

  return txt;
}

function getNameLower(name) {
  return removeExtension(name).toLowerCase();
}

function removeExtension(name) {
  return name.substring(0, name.length - 4);
}

function createHTML(obj, distpath, paths){
  if (!!paths){
    for(var i=0; i<paths.length; i++){
      createHTMLfile(distpath, replacePath(paths[i]) + 'index.html', createHTMLtxt(obj, paths[i]))
      .catch(function(e){
        log(e.message + '\nOccurred at createHTML in createHTMLfile call');
        process.exit();
      });
    }
  }
}

async function createHTMLfile(path, name, data){
  fs.writeFileSync(path + name, data);
}

function replacePath(path){
  return path.substring(1).replace(/\//g, '_');
}

function createHTMLtxt(obj, path){
  var objMeta = pagesMeta.get(path);
  var title = pagesMeta.TITLE;
  var meta = pagesMeta.DEFAULT_META;
  var css = pagesMeta.DEFAULT_CSS;
  var script = obj.mode == 'development'? pagesMeta.DEFAULT_SCRIPTS_DEV : pagesMeta.DEFAULT_SCRIPT;
  if (!!objMeta){
    if (!!objMeta.title){
      title = objMeta.title;
    }
    if (!!objMeta.meta){
      meta = objMeta.meta;
    }
    if (!!objMeta.css){
      css = objMeta.css;
    }
    if (!!objMeta.script){
      script = objMeta.script;
    }
  }
  
  var txt = '';
  txt+= '<!DOCTYPE html><html><head>' +
  '<title>' + title + '</title>' +
  getMetas(meta) +
  getCSS(css) +
  '</head><body><div id="app"></div>' +
  // '<div id="replace"></div>' +
  getScripts(script) +
  '<script src="./bundle/' + replacePath(path) + 'index_bundle.js"></script>' +
  '</body></html>'

  return txt;
}

function getMetas(meta){
  var txt = '';
  if (!!meta){
    for(var i=0; i<meta.length; i++){
      txt+= '<meta ' + meta[i] + '>';
    }
  }
  return txt;
}

function getCSS(meta){
  var txt = '';
  if (!!meta){
    for(var i=0; i<meta.length; i++){
      if (meta[i].includes('=')){
        txt+= '<link ' + meta[i] + '>';
      } else{
        txt+= '<link rel="stylesheet" type="text/css" href="' + meta[i] + '">';
      }
    }
  }
  return txt;
}

function getScripts(meta){
  var txt = '';
  if (!!meta){
    for(var i=0; i<meta.length; i++){
      if (meta[i].includes('=')){
        txt+= '<script ' + meta[i] + '></script>';
      } else{
        
        txt+= '<script src="' + meta[i] + '"></script>';
      }
    }
  }
  return txt;
}

function predictReadFolders(path, current){
  var paths = [];
  //prevent add home of pages '/'
  if (current != '/'){
    paths.push(current);
  }

  fs.readdirSync(path).forEach(function (file) {
    if (!fs.lstatSync(path + file).isFile()) {
      paths = paths.concat(predictReadFolders(path + file + '/', current + file + '/'));
    }
  });

  return paths;
}

module.exports = EntryPlugin;
module.exports.entry = function(basepath){
  var obj = {};
  var paths;
  paths = predictReadFolders(basepath + pagesLocation + '/', '/');
  for(var i=0; i<paths.length; i++){
    obj[replacePath(paths[i]) + 'index'] = './build/src/' + replacePath(paths[i]) + 'index.ts';
  }
  return obj;
}

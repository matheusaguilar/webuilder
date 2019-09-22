const TITLE_PAGES = 'WBuilder';

const DEFAULT_LAYOUT_PAGES = 'app_layout.vue';

/*
*
* Default Pages Meta
*
*/
const DEFAULT_META_PAGES = [
    'name="viewport" content="width=device-width, initial-scale=1.0"',
    'http-equiv="Content-Language" content="pt-br"'
];

/*
*
* Default Pages CSS
*
*/
const DEFAULT_CSS_PAGES = [
    'rel="shortcut icon" href="./favicon.ico" type="image/x-icon"',
    'rel="icon" href="./favicon.ico" type="image/x-icon"',
    'rel="manifest" href="./manifest/manifest.json"',
    'rel="preload" href="./assets/vendor/material_icons/iconfont/MaterialIcons-Regular.woff2" as="font" crossorigin="anonymous"',
    'rel="preload" href="./assets/vendor/et_line_icons/fonts/et-line.woff" as="font" crossorigin="anonymous"',
    './assets/vendor/material_icons/material_icons.css',
    './assets/vendor/et_line_icons/style.css',
    './assets/vendor/font_roboto/font_roboto.css',
    './assets/vendor/mdc/material-components-web.min.css'
];

/*
*
* Default Pages Meta
*
*/
const DEFAULT_SCRIPTS_PAGES = [
    './assets/vendor/vue/vue.min.js',
    './assets/vendor/vue/vue_router.min.js',
    './assets/vendor/mdc/material-components-web.min.js'
];

const DEFAULT_SCRIPTS_DEV_PAGES = [
    'https://unpkg.com/vue/dist/vue.js',
    'https://unpkg.com/vue-router/dist/vue-router.js',
    './assets/vendor/mdc/material-components-web.min.js'
];


/****************************************** ROUTES MAP **********************************************/

function getData(){
    return [

    ];
}

/****************************************** END ROUTES MAP ******************************************/

module.exports = {
    TITLE: TITLE_PAGES,
    DEFAULT_LAYOUT: DEFAULT_LAYOUT_PAGES,
    DEFAULT_META: DEFAULT_META_PAGES,
    DEFAULT_CSS: DEFAULT_CSS_PAGES,
    DEFAULT_SCRIPT: DEFAULT_SCRIPTS_PAGES,
    DEFAULT_SCRIPTS_DEV: DEFAULT_SCRIPTS_DEV_PAGES,
    data: getData(),
    get: function(path){
        for(var i=0; i<this.data.length; i++){
            if (this.data[i][0] == path){
                return this.data[i][1];
            }
        }
        return undefined;
    }
}

function getMetas(){
    return DEFAULT_META_PAGES.slice();
}

function getCSS(){
    return DEFAULT_CSS_PAGES.slice();
}

function getScript(){
    return DEFAULT_SCRIPTS_PAGES.slice();
}
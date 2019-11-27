<template>
  <div class="wb-app-main">
    <!--TopBar-->
    <header class="mdc-top-app-bar app-bar" id="app-bar">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <a href="#" class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon">menu</a>
          <span class="mdc-top-app-bar__title">WeBuilder</span>
        </section>

        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <button
            class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded"
            aria-label="Download"
            @click="downloadComponents()"
          >file_download</button>
        </section>
      </div>
    </header>

    <!--Drawer-->
    <aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust" id="app-drawer">
      <div class="mdc-drawer__content">
        <div class="mdc-list">
          <span class="mdc-list-title">Componentes</span>
          <div class="mdc-list-container comps">
            <a
              class="mdc-list-item"
              href="#"
              v-for="(comp, index) in components"
              :key="index"
              :name="comp.name"
              draggable="true"
              v-on:dragstart="dragComponent($event)"
            >
              <span class="mdc-list-item__text">{{comp.name}}</span>
            </a>
          </div>

          <span class="mdc-list-title">Árvore de componentes</span>
          <div class="mdc-list-container comp-tree">
            <CompTree
              :element="elem"
              :elementSelected="elementSelected"
              :level="0"
              v-for="(elem, index) in deviceElements"
              :key="index"
              @clicked="selectElement"
              @drop="addElementChild"
            />
          </div>
        </div>
      </div>
    </aside>

    <!--Content-->
    <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
      <main class="main-content" id="main-content">
        <div class="main-divider">
          <div class="device">
            <div class="content-menu">
              <div class="top-app-bar-devices">
                <i class="icon-laptop" @click="device = deviceLook.swithDeviceLook('desktop')"></i>
                <i class="icon-tablet" @click="device = deviceLook.swithDeviceLook('tablet')"></i>
                <i class="icon-phone" @click="device = deviceLook.swithDeviceLook('phone')"></i>
              </div>
            </div>

            <!--DeviceLook-->
            <div
              id="device-look"
              class="device-look"
              :style="{'max-width': device }"
              v-on:drop="dropComponent($event)"
              v-on:dragover="allowDropComponent($event)"
            >
              <div class="device-root">Root</div>

              <iframe
                id="deviceFrame"
                width="100%"
                height="564"
                frameborder="0"
                v-on:dragover="allowDropComponent($event)"
              ></iframe>
            </div>
          </div>

          <div class="props">
            <div class="props-title">
              <button class="mdc-button mdc-button--outlined" @click="showProps = !showProps">
                <i class="material-icons mdc-button__icon" aria-hidden="true">build</i>
                <span class="mdc-button__label">Props</span>
              </button>
            </div>
            <div class="props-container" v-show="showProps">
              <CompProps :component="this.elementSelected" @changeprop="changeProp" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Dialog-->
    <div id="app-dialog" class="mdc-dialog" role="alertdialog"
      aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
      <div class="mdc-dialog__container" style="width: 100%; max-width: 1000px">
        <div class="mdc-dialog__surface" style="width: 100%; max-width: 1000px">
          <h2 class="mdc-dialog__title" id="my-dialog-title">Code Generated</h2>
          <div class="mdc-dialog__content" id="my-dialog-content">
            <pre class="language-markup"><code class="language-markup" id="code-download"></code></pre>
            <!-- {{codeGenerated}} -->
          </div>
          <footer class="mdc-dialog__actions">
            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
              <span class="mdc-button__label">Close</span>
            </button>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCDrawer } from '@material/drawer';
import { MDCDialog } from '@material/dialog';
import CompTree from '_Components/wbuilder/compTree.vue';
import CompProps from '_Components/wbuilder/compProps.vue';

import {
  ComponentRegister,
  ComponentsLoader,
} from './../pages_src/ts/components';
import { KeyBoardEvents } from './../pages_src/ts/keyboard';
import { DeviceLook } from './../pages_src/ts/deviceLook';

import { WrapperUtil } from './../pages_src/ts/wrapperUtil';

class CompElement {
  public name: string;
  public element: Element;
  public instance: Object;
  public children: CompElement[] = [];
  public comp: ComponentRegister;
  public slot: number;

  constructor(
    name: string,
    element: Element,
    instance: Object,
    children: CompElement[],
    comp: ComponentRegister,
    slot: number
  ) {
    this.name = name;
    this.element = element;
    this.instance = instance;
    this.children = children;
    this.comp = comp;
    this.slot = slot;
  }
}

@Component({
  components: {
    CompTree,
    CompProps
  }
})
export default class AppLayout extends Vue {
  device: string = 'desktop';
  topAppBar: any = null; // topAppBar
  drawer: any = null; // Drawer
  dialog: any = null; // Dialog
  codeGenerated: any = null; // Code generated after click on download button.
  showProps = false; // show-hide props menu
  keyBoardEvents: any = null; // control keyboard events.
  deviceLook: any = null; // control changes in device look.
  nameUniqueIndex = 0; // variable to create unique index names on components.
  components: ComponentRegister[] = []; // components registereds.
  deviceElements: CompElement[] = []; // elements inserted in device look.
  elementSelected: any = null; // actual element selected.

  created() {
    // load components
    const c = new ComponentsLoader();
    for (const comp of c.items) {
      this.components.push({
        name: comp.name,
        value: Vue.extend({ mixins: [comp.value] })
      });
    }
  }

  mounted() {
    // MDC Components
    const drawerElement = document.getElementById('app-drawer');
    const topAppBarElement = document.getElementById('app-bar');
    const dialogElement = document.getElementById('app-dialog');

    if (drawerElement && topAppBarElement && dialogElement) {
      this.drawer = MDCDrawer.attachTo(drawerElement);
      this.topAppBar = MDCTopAppBar.attachTo(topAppBarElement);
      this.dialog = new MDCDialog(dialogElement);

      this.topAppBar.setScrollTarget(document.getElementById('main-content'));
      this.topAppBar.listen('MDCTopAppBar:nav', () => {
        this.drawer.open = !this.drawer.open;
      });
    }

    // Device Look
    this.deviceLook = new DeviceLook();
    this.device = this.deviceLook.swithDeviceLook('desktop');

    // KeyBoard events
    this.keyBoardEvents = new KeyBoardEvents(document);
    this.keyBoardEvents.delete(this.deleteElemOfDeviceLook);
    this.keyBoardEvents.arrowLeft(() => {
      this.device = this.deviceLook.prev(
        this.deviceLook.getDeviceSelected(this.device)
      );
    });
    this.keyBoardEvents.arrowRight(() => {
      this.device = this.deviceLook.next(
        this.deviceLook.getDeviceSelected(this.device)
      );
    });

    // iframe
    this.initIframe();
  }

  /**
   * generate the code needed to create the web page.
   */
  downloadComponents() {
    let html = '';
    const script = 'script';
    const style = 'style';

    html += '<template>\n<div>';
    // get the html of components
    for (const elem of this.deviceElements) {
      html += (<any>elem.instance).wbGetHTML(elem);
    }
    html += '\n</div>\n</template>';

    // get script imports
    let importTags: any = [];
    const compNames = {};

    html += `\n\n<${script} lang="ts">\n`;
    html += "import { Vue, Component, Prop } from 'vue-property-decorator';";
    // get imports of components
    for (const elem of this.deviceElements) {
      importTags = importTags.concat(
        WrapperUtil.getInstance().getImportTags(elem)
      );
    }
    importTags = importTags.filter(
      (v: any, i: any) => importTags.indexOf(v) === i
    );
    for (const tag of importTags) {
      html += `\nimport ${tag} from 'path/${tag}.vue';`;
    }
    // component vue
    html += '\n\n@Component({\ncomponents: {';
    for (let i = 0; i < importTags.length; i++) {
      html += `\n${importTags[i]}`;
      if (i !== importTags.length - 1) {
        html += ',';
      }
    }
    html += '\n}\n})';
    html += '\nexport default class MyClass extends Vue {\n\n}';
    html += `\n</${script}>`;

    // get the style class of components
    html += `\n\n<${style} lang="scss">`;
    const iframeDeviceLook = this.getFrameDeviceLook();
    if (iframeDeviceLook) {
      const styleElements = iframeDeviceLook.querySelectorAll('[style]');
      styleElements.forEach((elem) => {
        if ((<HTMLElement>elem).style.cssText) {
          html += `\n${this.getStyleComp(elem)}`;
        }
      });
    }
    html += `\n</${style}>`;

    let htmlParsed = html.replace(new RegExp('<', 'g'), '&lt;');
    htmlParsed = htmlParsed.replace(new RegExp('>', 'g'), '&gt;');

    this.codeGenerated = htmlParsed;
    const modalContent = document.getElementById('code-download');
    if (this.dialog && !this.dialog.isOpen && modalContent && (<any>window).Prism) {
      // Prism highlither
      modalContent.innerHTML = this.codeGenerated;
      (<any>window).Prism.highlightElement(modalContent);

      this.dialog.open();
    }
  }

  getStyleComp(element: any) {
    const styleClass = [];
    let ele = element;

    while (!ele.dataset.compname && !ele.id) {
      styleClass.push(
        ele.className ? `.${ele.className.split(' ')[0]}` : ele.nodeName
      );
      ele = ele.parentNode;
    }
    styleClass.push(ele.id ? `#${ele.id}` : `#${ele.dataset.compname}`);

    let buildClass = '';
    for (let i = styleClass.length - 1; i >= 0; i--) {
      if (i !== styleClass.length - 1) {
        buildClass += ' ';
      }
      buildClass += styleClass[i];
    }

    return (buildClass += ` {\n ${element.style.cssText} \n}`);
  }

  /**
   * init iframe.
   */
  initIframe() {
    const iframeDocument = this.getIframeDocument();
    if (iframeDocument) {
      iframeDocument.open();
      iframeDocument.write('<body></body>');

      // meta
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      iframeDocument.head.appendChild(meta);

      // fonts
      const fonts = document.querySelectorAll('link[as="font"]');
      for (let i = 0; i < fonts.length; i++) {
        iframeDocument.head.appendChild(fonts[i].cloneNode(true));
      }

      // stylesheets
      const styles = document.querySelectorAll('link[rel="stylesheet"]');
      for (let i = 0; i < styles.length; i++) {
        iframeDocument.head.appendChild(styles[i].cloneNode(true));
      }

      // styles
      const stylesElements = document.getElementsByTagName('style');
      for (let i = 0; i < stylesElements.length; i++) {
        iframeDocument.head.appendChild(stylesElements[i].cloneNode(true));
      }

      iframeDocument.body.style.margin = '0px';
      iframeDocument.body.style.display = 'block';
      iframeDocument.body.style.backgroundColor = 'white';
      iframeDocument.body.style.height = 'initial';
      iframeDocument.body.style.overflowX = 'hidden';
      iframeDocument.close();
    }
  }

  /**
   * get the iframe document.
   */
  getIframeDocument() {
    const iframe = <HTMLIFrameElement>document.getElementById('deviceFrame');
    if (!!iframe && !!iframe.contentWindow) {
      return iframe.contentWindow.document;
    }
  }

  /**
   * get the device-look id inside iframe.
   */
  getFrameDeviceLook() {
    const iframe = <HTMLIFrameElement>document.getElementById('deviceFrame');
    if (!!iframe && !!iframe.contentWindow) {
      return iframe.contentWindow.document.body;
    }
    return null;
  }

  /**
   * onDragStart set the data to be transfered.
   * @param event the drag event.
   */
  dragComponent(event: any) {
    event.dataTransfer.setData('text', event.target.name);
    event.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
  }

  /**
   * allow drop on component.
   * @param event the event to prevent.
   */
  allowDropComponent(event: Event) {
    event.preventDefault();
  }

  /**
   * on drop event, create an instance of vue component and add to device look.
   * @param event the event of drop.
   */
  dropComponent(event: any) {
    event.preventDefault();
    const name = event.dataTransfer.getData('text');
    const comp = this.getComponentByName(name);

    if (comp) {
      const instance = new comp.value();
      instance.$mount();
      this.elementSelected = this.createCompContainer(instance, name, comp);
      this.addElemToDeviceLook(this.elementSelected);
    }
  }

  /**
   * create an element object and add events to the component.
   * @param instance the vueComponent mounted instance.
   * @param name the name of component.
   */
  createCompContainer(instance: any, name: any, comp: any, slot?: any) {
    this.removeCompActiveClass();

    const uniqueName = `${name}-${this.nameUniqueIndex}`;
    this.nameUniqueIndex++;

    instance.$el.setAttribute('data-compname', uniqueName);
    instance.$el.className += ' wbcomp-active wbcursor';

    instance.$el.addEventListener('dragover', (event: any) => {
      this.allowDropComponent(event);
    });

    instance.$el.addEventListener('drop', (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      this.addElementChild({ event, element: instance.$el });
    });

    instance.$el.addEventListener('click', (event: any) => {
      event.stopPropagation();
      this.selectElement(instance.$el);
    });

    return {
      instance,
      comp,
      name: uniqueName,
      element: instance.$el,
      children: [],
      slot: !!slot ? slot : 0
    };
  }

  /**
   * when a property change, hover the new element
   */
  changeProp(event: any) {
    window.setTimeout(() => {
      event.className += ' wbcomp-active';
    },                100);
  }

  /**
   * add element to children of another. Used on drop element over another element.
   * @param obj contain obj.event the event of drag and obj.element the element html.
   */
  addElementChild(obj: any) {
    const name = obj.event.dataTransfer.getData('text');
    const comp = this.getComponentByName(name);
    const elem = this.getSelectElementRecursive(obj.element);

    if (!!comp && !!elem) {
      const instance = new comp.value();
      instance.$mount();

      let elementInstance = null;
      if (elem.instance.__wbInsertSlot !== undefined) {
        elementInstance = this.createCompContainer(
          instance,
          name,
          comp,
          elem.instance.__wbInsertSlot
        );
      } else {
        elementInstance = this.createCompContainer(instance, name, comp);
      }

      const inserted = this.insertHtmlWBuilder(elem, elementInstance.element);
      if (inserted) {
        this.elementSelected = elementInstance;
        elem.children.push(this.elementSelected);
      }
    }
  }

  /**
   * remove all classes active from components.
   */
  removeCompActiveClass() {
    const iframeDoc = this.getIframeDocument();
    if (iframeDoc) {
      const activeElement = iframeDoc.querySelectorAll('.wbcomp-active');
      activeElement.forEach((elem) => {
        elem.className = elem.className.replace(/ wbcomp-active/g, '');
      });
    }
  }

  /**
   * get a component in data.components by name.
   * @param name the name to look for.
   */
  getComponentByName(name: any): ComponentRegister | null {
    for (const comp of this.components) {
      if (comp.name === name) {
        return comp;
      }
    }
    return null;
  }

  /**
   * select an element based in html.
   * @param elem element html to search over data.deviceElements.
   */
  selectElement(elem: any) {
    this.removeCompActiveClass();
    elem.className += ' wbcomp-active';

    this.elementSelected = this.getSelectElementRecursive(elem);
  }

  /**
   * start search element in data.deviceElements.
   * @param elem element html to search over data.deviceElements.
   */
  getSelectElementRecursive(elem: any) {
    let response = null;
    for (const ele of this.deviceElements) {
      response = this.selectElementRecursive(ele, elem);
      if (response != null) {
        return response;
      }
    }

    return null;
  }

  /**
   * select element recursive over children.
   * @param elem element to check.
   * @param elemSearch element to look in search.
   */
  selectElementRecursive(elem: any, elemSearch: any): any {
    let response = null;
    if (elem.element === elemSearch) {
      return elem;
    }  if (elem.children.length > 0) {
      for (const ele of elem.children) {
        response = this.selectElementRecursive(ele, elemSearch);
        if (response) {
          return response;
        }
      }
    } else {
      return null;
    }
  }

  /**
   * add the element to device look (data.deviceElements).
   * @param obj the element to add, creted in createCompContainer
   */
  addElemToDeviceLook(obj: any) {
    const elem = this.getFrameDeviceLook();
    if (elem) {
      elem.appendChild(obj.element);
      this.deviceElements.push(obj);
    }
  }

  /**
   * delete the element in data.deviceElements.
   */
  deleteElemOfDeviceLook() {
    if (this.elementSelected) {
      const oldName = this.elementSelected.name;
      this.elementSelected.element.parentNode.removeChild(
        this.elementSelected.element
      );
      if (
        this.deleteElemOfDeviceLookRecursive(
          this.deviceElements,
          this.elementSelected
        )
      ) {
        if (
          oldName === this.elementSelected.name &&
          this.deviceElements.length > 0
        ) {
          this.elementSelected = this.deviceElements[0];
          this.selectElement(this.elementSelected.element);
        } else if (oldName === this.elementSelected.name) {
          this.elementSelected = null;
        } else {
          this.selectElement(this.elementSelected.element);
        }
      }
    }
  }

  /**
   * delete element looking in children elements.
   * @param elemArray the array to look.
   * @param elemSearch the element to search for.
   */
  deleteElemOfDeviceLookRecursive(elemArray: any, elemSearch: any): any {
    let searched = false;

    for (let i = 0; i < elemArray.length; i++) {
      if (elemArray[i].name === elemSearch.name) {
        searched = true;
        elemArray.splice(i, 1);
        if (elemArray.length > 0) {
          const removedIndex = i - 1 > 0 ? i - 1 : 0;
          this.elementSelected = elemArray[removedIndex];
        }
        break;
      }
    }

    for (const ele of elemArray) {
      if (!searched) {
        searched = this.deleteElemOfDeviceLookRecursive(
          ele.children,
          elemSearch
        );
      }
    }

    return searched;
  }

  /**
   * insert element html into WBuilder class inside another element.
   */
  insertHtmlWBuilder(elem: any, insertElem: any) {
    const nodes = elem.element.querySelectorAll('.wbuilder-insert');
    if (nodes.length > 0) {
      let parent = null;
      if (elem.instance.__wbInsertSlot !== undefined) {
        if (elem.instance.__wbInsertSlot <= nodes.length) {
          parent = nodes[elem.instance.__wbInsertSlot].parentNode;
        } else {
          return false;
        }
      } else {
        parent = nodes[0].parentNode;
      }
      parent.appendChild(insertElem);
      return true;
    }
    return false;
  }
}
</script>

<style lang="scss">
$selected: rgb(0, 194, 0);

body {
  margin: 0px;
  display: flex;
  height: 100vh;
  background: #f1f1f1;
}

.wb-app-main {
  width: 100%;

  //TopBar
  .mdc-top-app-bar {
    position: absolute;
    z-index: 7;
  }

  .mdc-drawer__content {
    overflow-y: hidden;
  }

  //Drawer
  .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)
    + .mdc-drawer-app-content {
    margin-left: 300px;
  }

  .mdc-drawer {
    width: 300px;

    .mdc-list {
      padding: 8px;
    }

    .mdc-list-title {
      color: rgba(0, 0, 0, 0.54);
    }

    .mdc-list-container {
      min-height: 200px;
      overflow-y: auto;
      margin-bottom: 16px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .comps {
      max-height: 280px;
    }

    .comp-tree {
      max-height: 280px;

      .active {
        color: $selected;
      }
    }
  }

  //Content
  .mdc-drawer-app-content {
    flex: auto;
    overflow: auto;
    position: relative;

    .main-content {
      overflow: auto;
      height: 100%;
      padding: 16px 0px 16px 16px;

      .main-divider {
        display: flex;
        overflow: hidden;

        .device {
          width: 100%;
          margin-right: 16px;

          .content-menu {
            max-width: 1280px;
            margin: 0px auto 6px auto;

            .top-app-bar-devices {
              margin: 0 auto;
              text-align: center;

              i {
                min-width: 35px;
                margin-left: 8px;
                padding: 4px;
                font-size: 24px;
                background-color: rgb(58, 58, 58);
                color: white;
                border: 1px solid rgba(0, 0, 0, 0.54);
                cursor: pointer;
              }
            }
          }

          .device-look {
            margin: 0 auto;
            background-color: white;
            border: 1px solid rgba(0, 0, 0, 0.1);
            max-width: 1280px;
            height: 600px;

            .device-root {
              height: 50px;
              padding: 16px;
              box-sizing: border-box;
              text-align: center;
              text-transform: uppercase;
              border-bottom: 1px solid rgba(0, 0, 0, 0.54);
            }
          }
        }

        .props {
          .props-title {
            padding: 2px 8px;
            text-align: right;
          }

          .props-container {
            min-width: 200px;
            max-width: 300px;
            min-height: 400px;
            padding: 12px;
            background-color: white;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}

.wbuilder-insert {
  display: none;
}

.wbcomp-active {
  border: 1px solid $selected;
}

.wbcursor {
  cursor: pointer;
}
</style>

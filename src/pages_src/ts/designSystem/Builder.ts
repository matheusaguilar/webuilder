const DEVELOP = true;

enum BuilderComponents {
  WBtopAppBar = './WBtopAppBar',
  WBdrawer = './WBdrawer',
  WBdrawerMainContent = './WBdrawerMainContent',
  WBbutton = './WBbutton',
  WBbuttonFAB = './WBbuttonFAB',
  WBbuttonIcon = './WBbuttonIcon',
  WBcard = './WBcard',
  WBcheckbox = './WBcheckbox',
  WBchipContainer = './WBchipContainer',
  WBlist = './WBlist',
  WBmodal = './WBmodal',
  WBradioButton = './WBradioButton',
  WBtextfield = './WBtextfield',
  WBtextarea = './WBtextarea',
  WBselect = './WBselect'
}

export class Builder {

  static instance: Builder | null = null;

  wbImports: any = {};

  // topAppBar variables for initialize
  topAppBarElement: any = null;
  drawerElement: any = null;
  drawerMainContentElement: any = null;

  /**
   * get instance of this object.
   */
  static getInstance(): Builder {
    if (!this.instance) {
      this.instance = new Builder();
    }
    return this.instance;
  }

  /**
   * if outside webuilder then call scripts from each element, else return null.
   * @param element the element to call the script.
   */
  init(element: string, dataId?: string) {
    if (!DEVELOP) {
      return this.getElement(element, dataId);
    }
    return null;
  }

  /**
   * call each element script.
   * @param element the element to call the script.
   */
  private getElement(element: string, dataId?: string) {
    return new Promise((resolve) => {
      switch (element) {
        case 'WBtopAppBar':
          this.lazyImportComponent(BuilderComponents.WBtopAppBar).then((component) => {
            this.topAppBarElement = new component();
            resolve(this.topAppBarElement);
          });
          break;

        case 'WBdrawer':
          this.lazyImportComponent(BuilderComponents.WBdrawer).then((component) => {
            this.drawerElement = new component();
            resolve(this.drawerElement);
          });
          break;

        case 'WBdrawerMainContent':
          this.lazyImportComponent(BuilderComponents.WBdrawerMainContent).then((component) => {
            this.drawerMainContentElement = new component();
            resolve(this.drawerMainContentElement);
          });
          break;

        case 'WBbutton':
          this.lazyImportComponent(BuilderComponents.WBbutton).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBbuttonFAB':
          this.lazyImportComponent(BuilderComponents.WBbuttonFAB).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBbuttonIcon':
          this.lazyImportComponent(BuilderComponents.WBbuttonIcon).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBcard':
          this.lazyImportComponent(BuilderComponents.WBcard).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBcheckbox':
          this.lazyImportComponent(BuilderComponents.WBcheckbox).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBchipContainer':
          this.lazyImportComponent(BuilderComponents.WBchipContainer).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBlist':
          this.lazyImportComponent(BuilderComponents.WBlist).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBmodal':
          this.lazyImportComponent(BuilderComponents.WBmodal).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBradioButton':
          this.lazyImportComponent(BuilderComponents.WBradioButton).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBtextfield':
          this.lazyImportComponent(BuilderComponents.WBtextfield).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBtextarea':
          this.lazyImportComponent(BuilderComponents.WBtextarea).then((component) => {
            resolve(new component(dataId));
          });
          break;

        case 'WBselect':
          this.lazyImportComponent(BuilderComponents.WBselect).then((component) => {
            resolve(new component(dataId));
          });
          break;

        default:
          resolve(null);
      }
    });
  }

  /**
   * lazy import a component.
   * @param component the component to be imported.
   */
  private lazyImportComponent(component: BuilderComponents): Promise<any> {
    return new Promise((resolve) => {
      const nameWithOutSpecial = component.replace(/\W/g, '');
      const nameLowercase = nameWithOutSpecial.toLowerCase();

      if (!this.wbImports[nameLowercase]) {
        this.wbImports[nameLowercase] = true;
        import(`./${component.replace(/\W/g, '')}`).then((mod) => {
          this.wbImports[nameLowercase] = mod[nameWithOutSpecial];
          resolve(this.wbImports[nameLowercase]);

        }).catch((err) => {
          this.wbImports[nameLowercase] = null;
          console.error(`Error on import module ${component}`);
          console.error(err);
          resolve(() => {});
        });

      } else {
        if (this.wbImports[nameLowercase] === true) {
          const checkInterval = window.setInterval(() => {
            if (this.wbImports[nameLowercase] !== true) {
              window.clearInterval(checkInterval);
              resolve(this.wbImports[nameLowercase]);
            }
          },                                       100);

        } else {
          resolve(this.wbImports[nameLowercase]);
        }
      }
    });
  }

  /**
   * init some components after all page has rendered.
   */
  public afterMounted() {
    // topAppBar
    const checkInterval = window.setInterval(() => {
      if (this.topAppBarElement && this.drawerElement && this.drawerMainContentElement) {
        window.clearInterval(checkInterval);
        const drawer = this.drawerElement.mdc.attachTo(this.drawerElement.dom);
        const topAppBar = this.topAppBarElement.mdc.attachTo(this.topAppBarElement.dom);

        topAppBar.setScrollTarget(this.drawerMainContentElement.dom);
        const btn = document.getElementById('wbMDCTopAppBarMenuBtn');

        if (btn) {
          btn.addEventListener('click', () => {
            if (!drawer.open) {
              drawer.open = true;
              this.drawerMainContentElement.dom.style.opacity = '0.4';
              this.drawerMainContentElement.dom.style.pointerEvents = 'none';
            } else {
              drawer.open = false;
              this.drawerMainContentElement.dom.style.opacity = '';
              this.drawerMainContentElement.dom.style.pointerEvents = '';
            }
          })
        }
      }
    },                                       100);
  }

}

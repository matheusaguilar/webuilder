import { WBtopAppBar } from './WBtopAppBar';
import { WBdrawer } from './WBdrawer';
import { WBdrawerMainContent } from './WBdrawerMainContent';

const develop = true;

export class Builder {

  static instance: Builder | null = null;

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
  init(element: string) {
    if (!develop) {
      return this.getElement(element);
    }
    return null;
  }

  /**
   * call each element script.
   * @param element the element to call the script.
   */
  private getElement(element: string) {
    switch (element) {
      case 'WBtopAppBar':
        this.topAppBarElement = new WBtopAppBar();
        return this.topAppBarElement;
      case 'WBdrawer':
        this.drawerElement = new WBdrawer();
        return this.drawerElement;
      case 'WBdrawerMainContent':
        this.drawerMainContentElement = new WBdrawerMainContent();
        return this.drawerMainContentElement;
      default:
        return null;
    }
  }

  /**
   * init some components after all page has rendered.
   */
  public afterMounted() {
    // topAppBar
    if (this.topAppBarElement && this.drawerElement && this.drawerMainContentElement) {
      const drawer = this.drawerElement.mdc.attachTo(this.drawerElement.dom);
      const topAppBar = this.topAppBarElement.mdc.attachTo(this.topAppBarElement.dom);

      topAppBar.setScrollTarget(this.drawerMainContentElement.dom);
      const btn = document.getElementById('wbMDCTopAppBarMenuBtn');

      if (btn) {
        btn.addEventListener('click', () => {
          drawer.open = !drawer.open;
        })
      }
    }
  }

}

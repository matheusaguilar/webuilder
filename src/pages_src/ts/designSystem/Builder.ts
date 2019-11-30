import { WBtopAppBar } from './WBtopAppBar';
import { WBdrawer } from './WBdrawer';
import { WBdrawerMainContent } from './WBdrawerMainContent';
import { WBbutton } from './WBbutton';
import { WBbuttonFAB } from './WBbuttonFAB';
import { WBbuttonIcon } from './WBbuttonIcon';
import { WBcard } from './WBcard';
import { WBcheckbox } from './WBcheckbox';
import { WBchipContainer } from './WBchipContainer';
import { WBlist } from './WBlist';
import { WBmodal } from './WBmodal';
import { WBradioButton } from './WBradioButton';
import { WBtextfield } from './WBtextfield';
import { WBselect } from './WBselect';

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
  init(element: string, dataId?: string) {
    if (!develop) {
      return this.getElement(element, dataId);
    }
    return null;
  }

  /**
   * call each element script.
   * @param element the element to call the script.
   */
  private getElement(element: string, dataId?: string) {
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

      case 'WBbutton':
        return new WBbutton(dataId);

      case 'WBbuttonFAB':
        return new WBbuttonFAB(dataId);

      case 'WBbuttonIcon':
        return new WBbuttonIcon(dataId);

      case 'WBcard':
        return new WBcard(dataId);

      case 'WBcheckbox':
        return new WBcheckbox(dataId);

      case 'WBchipContainer':
        return new WBchipContainer(dataId);

      case 'WBlist':
        return new WBlist(dataId);

      case 'WBmodal':
        return new WBmodal(dataId);

      case 'WBradioButton':
        return new WBradioButton(dataId);

      case 'WBtextfield':
        return new WBtextfield(dataId);

      case 'WBselect':
        return new WBselect(dataId);

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

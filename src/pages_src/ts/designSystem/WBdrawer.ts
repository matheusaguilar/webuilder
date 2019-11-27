import { MDCDrawer } from '@material/drawer';
import { WBcomponent } from './WBcomponent';

export class WBdrawer extends WBcomponent {

  constructor() {
    super();
    this.mdc = MDCDrawer;
    this.dom = document.getElementById('wbMDCDrawer');
  }

}

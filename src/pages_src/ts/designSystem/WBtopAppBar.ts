import { MDCTopAppBar } from '@material/top-app-bar';
import { WBcomponent } from './WBcomponent';

export class WBtopAppBar extends WBcomponent {

  constructor() {
    super();
    this.mdc = MDCTopAppBar;
    this.dom = document.getElementById('wbMDCTopAppBar');
  }

}

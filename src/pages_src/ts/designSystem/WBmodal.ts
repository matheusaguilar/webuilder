import { MDCDialog } from '@material/dialog';
import { WBcomponent } from './WBcomponent';

export class WBmodal extends WBcomponent {

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`div[${this.dataId}=${dataId}]`);
      if (this.dom) {
        this.mdc = new MDCDialog(this.dom);
      }
    }
  }

}

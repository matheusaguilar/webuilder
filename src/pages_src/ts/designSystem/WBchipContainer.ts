import { MDCChipSet } from '@material/chips';
import { WBcomponent } from './WBcomponent';

export class WBchipContainer extends WBcomponent {

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`div[${this.dataId}=${dataId}]`);
      if (this.dom) {
        this.mdc = new MDCChipSet(this.dom);
      }
    }
  }

}

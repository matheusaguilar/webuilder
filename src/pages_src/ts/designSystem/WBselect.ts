import { MDCSelect } from '@material/select';
import { WBcomponent } from './WBcomponent';

export class WBselect extends WBcomponent {

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`div[${this.dataId}=${dataId}]`);
      if (this.dom) {
        this.mdc = new MDCSelect(this.dom);
      }
    }
  }

}

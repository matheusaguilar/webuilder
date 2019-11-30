import { MDCTextField } from '@material/textfield';
import { WBcomponent } from './WBcomponent';

export class WBtextfield extends WBcomponent {

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`div[${this.dataId}=${dataId}]`);
      if (this.dom) {
        this.mdc = new MDCTextField(this.dom);
      }
    }
  }

}

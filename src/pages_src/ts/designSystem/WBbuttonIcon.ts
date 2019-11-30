import { MDCRipple } from '@material/ripple';
import { WBcomponent } from './WBcomponent';

export class WBbuttonIcon extends WBcomponent {

  ripple: MDCRipple | null = null;

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`button[${this.dataId}=${dataId}]`);
      if (this.dom) {
        this.ripple = new MDCRipple(this.dom);
        this.ripple.unbounded = true;
      }
    }
  }

}

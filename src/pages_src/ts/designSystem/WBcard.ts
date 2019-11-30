import { MDCRipple } from '@material/ripple';
import { WBcomponent } from './WBcomponent';

export class WBcard extends WBcomponent {

  ripple: MDCRipple | null = null;

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`div[${this.dataId}=${dataId}]`);
      if (this.dom) {
        const pAction = this.dom.querySelector('.mdc-card__primary-action');
        if (pAction) {
          this.ripple = new MDCRipple(pAction);
        }
      }
    }
  }

}

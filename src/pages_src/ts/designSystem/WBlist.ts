import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { WBcomponent } from './WBcomponent';

export class WBlist extends WBcomponent {

  riples: MDCRipple[] = [];

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`ul[${this.dataId}=${dataId}]`);
      if (this.dom) {
        const listItemRipples = this.dom.querySelectorAll('.mdc-list-item');
        if (listItemRipples) {
          this.mdc = new MDCList(this.dom);
          for (const elem of listItemRipples) {
            this.riples.push(new MDCRipple(elem));
          }
        }
      }
    }
  }

}

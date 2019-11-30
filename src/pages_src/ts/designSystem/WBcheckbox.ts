import { MDCFormField } from '@material/form-field';
import { MDCCheckbox } from '@material/checkbox';
import { WBcomponent } from './WBcomponent';

export class WBcheckbox extends WBcomponent {

  formField: MDCFormField | null = null;

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`div[${this.dataId}=${dataId}]`);
      if (this.dom) {
        const checkbox = this.dom.querySelector('.mdc-checkbox');
        if (checkbox) {
          this.formField = new MDCFormField(this.dom);
          this.mdc = new MDCCheckbox(checkbox);
          this.formField.input = this.mdc;
        }
      }
    }
  }

}

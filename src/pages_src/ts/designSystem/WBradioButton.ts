import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';
import { WBcomponent } from './WBcomponent';

export class WBradioButton extends WBcomponent {

  formField: MDCFormField | null = null;

  constructor(dataId: string | undefined) {
    super();
    if (dataId) {
      this.dom = document.querySelector(`div[${this.dataId}=${dataId}]`);
      if (this.dom) {
        const radioButton = this.dom.querySelector('.mdc-radio');
        if (radioButton) {
          this.formField = new MDCFormField(this.dom);
          this.mdc = new MDCRadio(radioButton);
          this.formField.input = this.mdc;
        }
      }
    }
  }

}

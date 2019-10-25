<template>
  <WBtextfield :variant="variant__Options[variant]" :label="label" :shaped="shaped__Check"
    :left-icon="leftIcon" :right-icon="rightIcon" :helper-text="helperText" :counter="counter"></WBtextfield>
</template>

<script>
import WBtextfield from "../designSystem/WBtextfield";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBtextfield
  },
  props: {
    variant: { default: 0 },
    label: { default: 'Textfield Label' },
    shaped: { default: false },
    leftIcon: { default: '' },
    rightIcon: { default: '' },
    helperText: { default: '' },
    counter: { default: '' }
  },
  data(){
    return {
        variant__Options: [
            'filled',
            'outlined',
            'full-width'
        ],
        shaped__Check: false
    }
  },
  methods: {
    wbGetTag(){
      return ['WBtextfield'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`variant="${this.variant__Options[this.variant]}" label="${this.label}"
          shaped="${this.shaped__Check}" left-icon="${this.leftIcon}" right-icon="${this.rightIcon}" 
          helper-text="${this.helperText}" counter="${this.counter}"`], elem, true);
    }
  }
};
</script>

<style lang="scss">
.mdc-text-field-helper-text {
  opacity: 1;
}
</style>
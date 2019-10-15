<template>
  <WBbutton :variant="variant__Options[variant]" :text="text" :dense="dense__Check"
    :left-icon="leftIcon" :right-icon="rightIcon">
  </WBbutton>
</template>


<script>
import WBbutton from "../designSystem/WBbutton";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBbutton
  },
  props: {
    variant: { default: 0 },
    text: { default: 'Text' },
    dense: { default: false },
    leftIcon: { default: '' },
    rightIcon: { default: '' }
  },
  data(){
    return{
      variant__Options: [
        'raised',
        'text',
        'outlined',
        'unelevated'
      ],
      dense__Check: false
    }
  },
  methods: {
    wbGetTag(){
      return ['WBbutton'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(),
        [`variant="${this.variant__Options[this.variant]}" text="${this.text}" dense="${this.dense__Check}"
          left-icon="${this.leftIcon}" right-icon="${this.rightIcon}"`], elem, true);
    }
  }
};
</script>
<template>
  <WBchip :variant="variant__Options[variant]" :text="text" :left-icon="leftIcon"></WBchip>
</template>

<script>
import WBchip from "../designSystem/WBchip";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBchip
  },
  props: {
    text: { default: 'Text' },
    variant: { default: 'round' },
    leftIcon: { default: 'alarm' }
  },
  data(){
    return{
      variant__Options: [
        'round',
        'shaped'
      ]
    }
  },
  methods: {
    wbGetTag(){
      return ['WBchip'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`variant="${this.variant__Options[this.variant]}" text="${this.text}" left-icon="${this.leftIcon}"`], elem, true);
    }
  }
};
</script>
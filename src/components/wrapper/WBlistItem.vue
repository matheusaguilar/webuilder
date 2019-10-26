<template>
  <WBlistItem :primaryText="primaryText" :secondaryText="secondaryText" :leftIcon="leftIcon"></WBlistItem>
</template>

<script>
import WBlistItem from "../designSystem/WBlistItem";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBlistItem
  },
  props: {
    primaryText: { default: 'Primary Text' },
    secondaryText: { default: '' },
    leftIcon: { default: '' }
  },
  methods: {
    wbGetTag(){
      return ['WBlistItem'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`primaryText="${this.primaryText}" secondaryText="${this.secondaryText}" leftIcon="${this.leftIcon}"`], elem, true);
    }
  }
};
</script>
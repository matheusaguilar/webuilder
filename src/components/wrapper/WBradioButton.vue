<template>
  <WBradioButton :label="label"></WBradioButton>
</template>

<script>
import WBradioButton from "../designSystem/WBradioButton";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBradioButton
  },
  props: {
    label: { default: 'Radio Label' }
  },
  methods: {
    wbGetTag(){
      return ['WBradioButton'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), [`label="${this.label}"`], elem, true);
    }
  }
};
</script>
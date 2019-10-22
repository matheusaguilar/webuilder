<template>
  <WBcheckbox :label="label"></WBcheckbox>
</template>

<script>
import WBcheckbox from "../designSystem/WBcheckbox";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBcheckbox
  },
  props: {
    label: { default: 'Checkbox Label' }
  },
  methods: {
    wbGetTag(){
      return ['WBcheckbox'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), [`label="${this.label}"`], elem, true);
    }
  }
};
</script>
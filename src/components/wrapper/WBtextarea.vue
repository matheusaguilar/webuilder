<template>
  <WBtextarea :label="label"></WBtextarea>
</template>

<script>
import WBtextarea from "../designSystem/WBtextarea";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBtextarea
  },
  props: {
    label: { default: 'Textarea Label' },
  },
  methods: {
    wbGetTag(){
      return ['WBtextarea'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), [`label="${this.label}"`], elem, true);
    }
  }
}
</script>
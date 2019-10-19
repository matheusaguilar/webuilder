<template>
  <WBmodal></WBmodal>
</template>

<script>
import WBmodal from "../designSystem/WBmodal";
import { MDCDialog } from '@material/dialog';
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBmodals
  },
  mounted(){
    this.$nextTick(() => {
        const iframe = document.getElementById('deviceFrame');
        const iframeDocument = iframe.contentWindow.document;
        const dialog = new MDCDialog(iframeDocument.querySelector('.mdc-dialog'));
        dialog.open();
    });
  },
  methods: {
    wbGetTag(){
      return ['WBmodal'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
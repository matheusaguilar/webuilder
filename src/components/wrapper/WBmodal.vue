<template>
  <WBmodal :title="title" :text="text" :label-no="labelNo" :label-yes="labelYes"></WBmodal>
</template>

<script>
import WBmodal from "../designSystem/WBmodal";
import { MDCDialog } from '@material/dialog';
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBmodal
  },
  props: {
    title: { default: 'Dialog Title' },
    text: { default: 'Dialog body text goes here.' },
    labelNo: { default: 'No' },
    labelYes: { default: 'Yes' },
    open: { default: false }
  },
  data() {
    return {
      dialog: null,
      open__Check: true
    }
  },
  mounted(){
    this.$nextTick(() => {
        const iframe = document.getElementById('deviceFrame');
        const iframeDocument = iframe.contentWindow.document;
        const dialog = new MDCDialog(iframeDocument.querySelector('.mdc-dialog'));
        this.dialog = dialog;
        dialog.open();
    });
  },
  watch: {
    open__Check: function(val){
      if (val){
        this.dialog.open();
      } else{
        this.dialog.close();
      }
    }
  },
  methods: {
    wbGetTag(){
      return ['WBmodal'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`title="${this.title}" text="${this.text}" label-no="${this.labelNo}" label-yes="${this.labelYes}"`], elem, true);
    }
  }
};
</script>
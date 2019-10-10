<template>
    <WBbuttonIcon :id="'wbButtonIcon' + _uid" :icon="icon" :iconOn="iconOn"></WBbuttonIcon>
</template>

<script>
import WBbuttonIcon from "../designSystem/WBbuttonIcon";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";
import {MDCIconButtonToggle} from '@material/icon-button';

export default {
  components: {
    WBbuttonIcon
  },
  props: {
    icon: { default: 'favorite' },
    iconOn: { default: 'favorite_border' }
  },
  mounted(){
    this.$nextTick(() => {
        const iframe = document.getElementById('deviceFrame');
        if (iframe){
            const iframeDocument = iframe.contentWindow.document;
            const elem = iframeDocument.getElementById('wbButtonIcon' +this. _uid);
            const iconToggle = new MDCIconButtonToggle(elem);
            iconToggle.unbounded = true;
        }
    });
  },
  methods: {
    wbGetTag(){
      return ['WBbuttonFAB'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
}
</script>
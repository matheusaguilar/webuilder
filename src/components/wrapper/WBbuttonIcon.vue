<template>
  <WBbuttonIcon :id="'wbButtonIcon' + _uid" :icon="icon" :iconOn="iconOn"></WBbuttonIcon>
</template>

<script>
import WBbuttonIcon from "../designSystem/WBbuttonIcon";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBbuttonIcon
  },
  props: {
    icon: { default: 'favorite_border' },
    iconOn: { default: 'favorite' }
  },
  mounted(){
    this.$nextTick(() => {
        const iframe = document.getElementById('deviceFrame');
        if (iframe){
          const iframeDocument = iframe.contentWindow.document;
          const elem = iframeDocument.getElementById('wbButtonIcon' + this. _uid);
          elem.addEventListener('click', () => {
            if (elem.children.length == 2){
              let styles = window.getComputedStyle(elem.children[0]);
              if (styles.getPropertyValue('display') != 'none'){
                elem.children[0].style.display = 'none';
                elem.children[1].style.display = 'inline-block';
              } else {
                elem.children[0].style.display = 'inline-block';
                elem.children[1].style.display = 'none';
              }
            } else{
              elem.children[0].style.display = 'inline-block';
            }
          });
        }
    });
  },
  methods: {
    wbGetTag(){
      return ['WBbuttonIcon'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(),
        [`icon="${this.icon}" iconOn="${this.iconOn}"`], elem, true);
    }
  }
}
</script>
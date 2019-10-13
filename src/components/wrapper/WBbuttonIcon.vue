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
    icon: { default: "favorite_border" },
    iconOn: { default: "favorite" }
  },
  mounted() {
    this.$nextTick(() => {
      const elem = this.getElementOnIframe();
      if (elem) {
        elem.addEventListener("click", () => {
          if (elem.children.length == 2) {
            let styles = window.getComputedStyle(elem.children[0]);
            if (styles.getPropertyValue("display") != "none") {
              elem.children[0].style.display = "none";
              elem.children[1].style.display = "inline-block";
            } else {
              elem.children[0].style.display = "inline-block";
              elem.children[1].style.display = "none";
            }
          } else {
            elem.children[0].style.display = "inline-block";
          }
        });
      }
    });
  },
  methods: {
    getElementOnIframe() {
      const iframe = document.getElementById("deviceFrame");
      if (iframe) {
        const iframeDocument = iframe.contentWindow.document;
        return iframeDocument.getElementById("wbButtonIcon" + this._uid);
      }
      return null;
    },
    wbGetTag() {
      return ["WBbuttonIcon"];
    },
    wbGetHTML(elem) {
      const iframeElem = this.getElementOnIframe();
      if (iframeElem){
        //reset style of display
        if (iframeElem.children[0]){
          iframeElem.children[0].style.display = '';
        }
        if (iframeElem.children[1]){
          iframeElem.children[1].style.display = '';
        }
      }

      return WrapperUtil.getInstance().getTag(
        this.wbGetTag(),
        [`id="wbButtonIcon${this._uid}" icon="${this.icon}" iconOn="${this.iconOn}"`],
        elem,
        true
      );
    }
  }
};
</script>
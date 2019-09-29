<template>
  <div>
    <WBMDCtopAppBar :title="title" :variant="variant__Options[variant]">
      <div class="wbuilder-insert"></div>
    </WBMDCtopAppBar>
    <WBMDCdrawer>
      <div class="wbuilder-insert"></div>
    </WBMDCdrawer>
    <WBMDCdrawerMainContent :topappbar="variant__Options[variant]">
      <div class="wbuilder-insert"></div>
    </WBMDCdrawerMainContent>
  </div>
</template>

<script>
import WBMDCtopAppBar from "../designSystem/MDC_topAppBar";
import WBMDCdrawer from "../designSystem/MDC_drawer";
import WBMDCdrawerMainContent from "../designSystem/MDC_drawerMainContent";

import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBMDCtopAppBar,
    WBMDCdrawer,
    WBMDCdrawerMainContent
  },
  props: {
    variant: { default: 0 },
    title: { default: 'Title' },
    __wbInsertSlot: { default: 0 }
  },
  data: function() {
    return {
      variant__Options: [
        'standard',
        // 'short',
        // 'short-collapsed',
        // 'prominent',
        // 'prominent-dense',
        'fixed',
        'dense'
      ],
      __wbInsertSlot__Options: ['0', '1', '2']
    };
  },
  mounted(){
    //call after all view mounted.
    this.$nextTick(() => {
      this.updateComponents();
    });
  },
  methods: {
    updateComponents(){
      const iframe = document.getElementById('deviceFrame');
      if (iframe){
        const iframeDocument = iframe.contentWindow.document;
        const iframeMDC = iframe.contentWindow.mdc;
        const topAppElem = iframeDocument.getElementById('wbMDCTopAppBar');
        const drawerElem = iframeDocument.getElementById('wbMDCDrawer');
        const mainContentElem = iframeDocument.getElementById('wbMDCMainContent');
        const menuElem = iframeDocument.getElementById('wbMDCTopAppBarMenuBtn');

        if (!!topAppElem && !!drawerElem && !!mainContentElem && !!menuElem){
          const drawer = MDCDrawer.attachTo(drawerElem);
          const topAppBar = MDCTopAppBar.attachTo(topAppElem);
          topAppBar.setScrollTarget(mainContentElem);
          menuElem.addEventListener('click', () =>{
            drawer.open = !drawer.open;
          });
        }
      }
    },

    wbGetHTML(elem){
      //slot 0
      let htmlComp = `\n<WBMDCtopAppBar title="${this.title}" variant="${this.variant__Options[this.variant]}">`;
      htmlComp += WrapperUtil.getChildrenBySlotHTML(elem, true, 0);
      htmlComp += '\n</WBMDCtopAppBar>';

      //slot 1
      htmlComp += `\n<WBMDCdrawer>`;
      htmlComp += WrapperUtil.getChildrenBySlotHTML(elem, true, 1);
      htmlComp += '\n</WBMDCdrawer>';

      //slot 2
      htmlComp += `\n<WBMDCdrawerMainContent topappbar="${this.variant__Options[this.variant]}">`;
      htmlComp += WrapperUtil.getChildrenBySlotHTML(elem, true, 2);
      htmlComp += '\n</WBMDCdrawerMainContent>';

      return htmlComp;
    }
  }
};
</script>
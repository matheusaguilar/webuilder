<template>
  <div>
    <WBtopAppBar :title="title" :variant="variant__Options[variant]">
      <div class="wbuilder-insert"></div>
    </WBtopAppBar>
    <WBdrawer>
      <div class="wbuilder-insert"></div>
    </WBdrawer>
    <WBdrawerMainContent :topappbar="variant__Options[variant]">
      <div class="wbuilder-insert"></div>
    </WBdrawerMainContent>
  </div>
</template>

<script>
import WBtopAppBar from "../designSystem/WBtopAppBar";
import WBdrawer from "../designSystem/WBdrawer";
import WBdrawerMainContent from "../designSystem/WBdrawerMainContent";

import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBtopAppBar,
    WBdrawer,
    WBdrawerMainContent
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
    wbGetTag(){
      return ['WBtopAppBar', 'WBdrawer', 'WBdrawerMainContent'];
    },
    wbGetHTML(elem){
      // slot 0
      let htmlComp = WrapperUtil.getInstance().getTag([this.wbGetTag()[0]], 
        [`title="${this.title}" variant="${this.variant__Options[this.variant]}"`], elem, true, 0);

      // slot 1
      htmlComp += WrapperUtil.getInstance().getTag([this.wbGetTag()[1]], null, elem, true, 1);

      // slot 2
      htmlComp += WrapperUtil.getInstance().getTag([this.wbGetTag()[2]], 
        [`topappbar="${this.variant__Options[this.variant]}"`], elem, true, 2);

      return htmlComp;
    }
  }
};
</script>
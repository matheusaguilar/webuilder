<template>
  <WBlayoutGridCell :desktop="desktop" :tablet="tablet" :phone="phone">
    <div class="wbuilder-insert"></div>
  </WBlayoutGridCell>
</template>

<script>
import WBlayoutGridCell from "../designSystem/WBlayoutGridCell";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBlayoutGridCell
  },
  props: {
    desktop: { default: "12" },
    tablet: { default: "8" },
    phone: { default: "4" }
  },
  methods: {
    wbGetTag(){
      return ['WBlayoutGridCell'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`desktop="${this.desktop}" tablet="${this.tablet}" phone="${this.phone}"`], elem);
    }
  }
};
</script>
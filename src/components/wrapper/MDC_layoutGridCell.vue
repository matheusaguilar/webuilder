<template>
  <MDClayoutGridCell :desktop="desktop" :tablet="tablet" :phone="phone">
    <div class="wbuilder-insert"></div>
    <h5>Ola Hahaha!</h5>
    <div>
      Hahaha <span style="color: red"> eita</span>
    </div>
  </MDClayoutGridCell>
</template>

<script>
import MDClayoutGridCell from "../designSystem/MDC_layoutGridCell";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    MDClayoutGridCell
  },
  props: {
    desktop: { default: "12" },
    tablet: { default: "8" },
    phone: { default: "4" }
  },
  methods: {
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag('MDClayoutGridCell', 
        `desktop="${this.desktop}" tablet="${this.tablet}" phone="${this.phone}"`, elem);
    }
  }
};
</script>
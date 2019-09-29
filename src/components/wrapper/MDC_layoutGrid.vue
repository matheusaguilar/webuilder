<template>
  <MDCLayoutGrid>
    <MDCLayoutGridInner>
      <div class="wbuilder-insert"></div>
    </MDCLayoutGridInner>
  </MDCLayoutGrid>
</template>

<script>
import MDCLayoutGrid from "../designSystem/MDC_layoutGrid";
import MDCLayoutGridInner from "../designSystem/MDC_layoutGridInner";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    MDCLayoutGrid,
    MDCLayoutGridInner
  },
  methods: {
    wbGetHTML(elem){
      let htmlComp = '\n<MDCLayoutGrid>\n<MDCLayoutGridInner>';
      htmlComp += WrapperUtil.getChildrenHTML(elem, true);
      htmlComp += '\n</MDCLayoutGridInner>\n</MDCLayoutGrid>';

      return htmlComp;
    }
  }
};
</script>
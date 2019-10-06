<template>
  <WBlayoutGrid>
    <WBlayoutGridInner>
      <div class="wbuilder-insert"></div>
    </WBlayoutGridInner>
  </WBlayoutGrid>
</template>

<script>
import WBlayoutGrid from "../designSystem/WBlayoutGrid";
import WBlayoutGridInner from "../designSystem/WBlayoutGridInner";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBlayoutGrid,
    WBlayoutGridInner
  },
  methods: {
    wbGetTag(){
      return ['WBlayoutGrid', 'WBlayoutGridInner'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
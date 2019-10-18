<template>
  <WBdataTableRow>
    <div class="wbuilder-insert"></div>
  </WBdataTableRow>
</template>

<script>
import WBdataTableRow from "../designSystem/WBdataTableRow";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBdataTableRow
  },
  methods: {
    wbGetTag(){
      return ['WBdataTableRow'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
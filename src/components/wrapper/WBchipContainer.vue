<template>
  <WBchipContainer>
    <div class="wbuilder-insert"></div>
  </WBchipContainer>
</template>

<script>
import WBchipContainer from "../designSystem/WBchipContainer";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBchipContainer
  },
  methods: {
    wbGetTag(){
      return ['WBchipContainer'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
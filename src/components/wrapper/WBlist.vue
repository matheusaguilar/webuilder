<template>
  <WBlist>
    <div class="wbuilder-insert"></div>
  </WBlist>
</template>

<script>
import WBlist from "../designSystem/WBlist";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBlist
  },
  methods: {
    wbGetTag(){
      return ['WBlist'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
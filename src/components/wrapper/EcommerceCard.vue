<template>
  <WBlayoutGridCell :desktop="4" :tablet="4" :phone="4">
    <EcommerceCard></EcommerceCard>
  </WBlayoutGridCell>
</template>


<script>
import EcommerceCard from "../designSystem/EcommerceCard";
import WBlayoutGridCell from "../designSystem/WBlayoutGridCell";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    EcommerceCard,
    WBlayoutGridCell
  },
  methods: {
    wbGetTag(){
      return ['EcommerceCard'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
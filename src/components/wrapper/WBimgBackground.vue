<template>
  <WBimgBackground :img="img">
      <div class="wbuilder-insert"></div>
  </WBimgBackground>
</template>

<script>
import WBimgBackground from "../designSystem/WBimgBackground";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBimgBackground
  },
  props: {
    img: { default: '/assets/img/imgBackground.jpg' }
  },
  methods: {
    wbGetTag(){
      return ['WBimgBackground'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), [`img="${img}"`], elem, true);
    }
  }
};
</script>
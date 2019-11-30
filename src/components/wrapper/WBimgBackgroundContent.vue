<template>
  <WBimgBackgroundContent :position="position__Options[position]">
    <div class="wbuilder-insert"></div>
  </WBimgBackgroundContent>
</template>

<script>
import WBimgBackgroundContent from "../designSystem/WBimgBackgroundContent";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBimgBackgroundContent
  },
  props: {
    position: { default: 0 }
  },
  data(){
    return {
        position__Options: [
            'left',
            'center',
            'right'
        ]
    }
  },
  methods: {
    wbGetTag(){
      return ['WBimgBackgroundContent'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`position="${this.position__Options[this.position]}"`], elem, true);
    }
  }
};
</script>
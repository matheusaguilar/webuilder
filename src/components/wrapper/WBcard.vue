<template>
  <WBcard :variant="variant__Options[variant]" :action="action__Check"></WBcard>
</template>

<script>
import WBcard from "../designSystem/WBcard";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBcard
  },
  props: {
    variant: { default: 0 },
    action: { default: false },
  },
  data(){
    return{
      variant__Options: [
        'basic',
        'text over media',
        'header',
        'image and text'
      ],
      action__Check: false
    }
  },
  methods: {
    wbGetTag(){
      return ['WBcard'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
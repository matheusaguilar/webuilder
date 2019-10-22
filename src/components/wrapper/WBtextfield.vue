<template>
  <WBtextfield :variant="variant__Options[variant]" :label="label"></WBtextfield>
</template>

<script>
import WBtextfield from "../designSystem/WBtextfield";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBtextfield
  },
  props: {
    variant: { default: 0 },
    label: { default: 'Textfield Label' }
  },
  data(){
    return {
        variant__Options: [
            'filled',
            'outlined',
            'full-width'
        ],
    }
  },
  methods: {
    wbGetTag(){
      return ['WBtextfield'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), null, elem, true);
    }
  }
};
</script>
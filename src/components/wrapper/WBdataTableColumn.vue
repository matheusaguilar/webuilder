<template>
  <WBdataTableColumn :variant="variant__Options[variant]" 
    :text="text" :numeric="numeric__Check"></WBdataTableColumn>
</template>

<script>
import WBdataTableColumn from "../designSystem/WBdataTableColumn";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBdataTableColumn
  },
  props: {
    text: { default: 'Text' },
    variant: { default: 0 },
    numeric: { default: false },
  },
  data(){
    return{
      variant__Options: [
        'header',
        'body'
      ],
      numeric__Check: false
    }
  },
  methods: {
    wbGetTag(){
      return ['WBdataTableColumn'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`variant="${this.variant__Options[this.variant]}" text="${this.text}" :numeric="${this.numeric__Check}"`], elem, true);
    }
  }
};
</script>
<template>
  <WBbutton :variant="variant__Options[variant]" :text="text" :dense="dense__Options[dense]"></WBbutton>
</template>


<script>
import WBbutton from "../designSystem/WBbutton";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBbutton
  },
  props: {
    variant: { default: 0 },
    text: { default: 'Text' },
    dense: { default: 0 }
  },
  data(){
    return{
      variant__Options: [
        'raised',
        'text',
        'outlined',
        'unelevated'
      ],
      dense__Options: [
        'no',
        'yes'
      ]
    }
  },
  methods: {
    wbGetTag(){
      return ['WBbutton'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(),
        [`variant="${this.variant__Options[this.variant]}" text="${this.text}"`], elem, true);
    }
  }
};
</script>
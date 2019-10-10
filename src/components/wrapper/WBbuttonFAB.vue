<template>
  <WBbuttonFAB :variant="variant__Options[variant]" :text="text" :mini="mini__Check"
    :left-icon="leftIcon" :right-icon="rightIcon"></WBbuttonFAB>
</template>

<script>
import WBbuttonFAB from "../designSystem/WBbuttonFAB";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBbuttonFAB
  },
  props: {
    variant: { default: 0 },
    text: { default: '' },
    mini: { default: 0 },
    leftIcon: { default: 'favorite' },
    rightIcon: { default: '' }
  },
  data(){
    return{
      variant__Options: [
        'standard',
        'extended'
      ],
      mini__Check: false
    }
  },
  methods: {
    wbGetTag(){
      return ['WBbuttonFAB'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`variant="${this.variant__Options[this.variant]}" text="${this.text}" mini="${this.mini__Check}"
            left-icon="${this.leftIcon}" right-icon="${this.rightIcon}"`], elem, true);
    }
  }
};
</script>
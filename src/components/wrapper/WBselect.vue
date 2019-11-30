<template>
    <WBselect :variant="variant__Options[variant]" :label="label" :shaped="shaped__Check"
        :items="items"></WBselect>
</template>

<script>
import WBselect from "../designSystem/WBselect";
import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBselect
  },
  props: {
    variant: { default: 0 },
    label: { default: 'Label' },
    shaped: { default: false }
  },
  data(){
    return{
        items: ['Option 1', 'Option 2', 'Option 3'],
        variant__Options: [
            'filled',
            'outlined'
        ],
        shaped__Check: false
    }
  },
  methods: {
    wbGetTag(){
      return ['WBselect'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`variant="${this.variant__Options[this.variant]}" label="${this.label}" :shaped="${this.shaped__Check}"
        items=""`], elem, true);
    }
  }
};
</script>
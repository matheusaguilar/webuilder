<template>
  <WBcard :variant="variant__Options[variant]" img="/assets/img/card.jpg"
    :title="title" :subtitle="subtitle" :description="description" 
    :action="action__Check">
      <div class="wbuilder-insert"></div>
  </WBcard>
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
    title: { default: 'Title' },
    subtitle: { default: 'SubTitle' },
    description: { default: 'Description' },
    action: { default: true }
  },
  data(){
    return{
      variant__Options: [
        'basic',
        'basic-overmedia',
        'basic-header',
        'image-text'
      ],
      action__Check: true
    }
  },
  methods: {
    wbGetTag(){
      return ['WBcard'];
    },
    wbGetHTML(elem){
      return WrapperUtil.getInstance().getTag(this.wbGetTag(), 
        [`variant="${this.variant__Options[this.variant]}" img="/assets/img/card.jpg"
        title="${this.title}" subtitle="${this.subtitle}" description="${this.description}" 
        action="${this.action__Check}"`], elem, true);
    }
  }
};
</script>
<template>
  <ul class="mdc-list" :id="id" :data-wbid="'list' + _uid">
    <slot></slot>
  </ul>
</template>

<script>
import { Builder } from "_PagesSrc/ts/designSystem/Builder";

export default {
  props: ["id"],
  data: function() {
    return {
      element: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init("WBlist", "list" + this._uid);
  }
};
</script>
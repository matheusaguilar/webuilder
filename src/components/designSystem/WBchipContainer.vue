<template>
    <div class="mdc-chip-set" :id="id" :data-wbid="'chipcontainer' + _uid">
        <slot></slot>
    </div>
</template>

<script>
import { Builder } from "@src/ts/designSystem/Builder";

export default {
  props: ['id'],
  data: function() {
    return {
      element: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init(
      "WBchipContainer",
      "chipcontainer" + this._uid
    );
  }
}
</script>
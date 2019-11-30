<template>
  <button class="mdc-icon-button" :id="id" :data-wbid="'button' + _uid">
    <i class="material-icons mdc-icon-button__icon">{{icon}}</i>
    <i
      class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"
      v-if="iconOn"
    >{{iconOn}}</i>
  </button>
</template>

<script>
import { Builder } from "_PagesSrc/ts/designSystem/Builder";

export default {
  props: {
    id: null,
    icon: { default: "favorite_border" },
    iconOn: { default: "favorite" }
  },
  data: function() {
    return {
      element: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init(
      "WBbuttonIcon",
      "button" + this._uid
    );
  }
};
</script>
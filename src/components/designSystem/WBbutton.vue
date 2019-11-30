<template>
  <button :class="'mdc-button' + buttonClass + denseClass" :id="id" :data-wbid="'button' + _uid">
    <i class="material-icons mdc-button__icon" aria-hidden="true" v-if="leftIcon">{{leftIcon}}</i>
    <span class="mdc-button__label">{{text}}</span>
    <i class="material-icons mdc-button__icon" aria-hidden="true" v-if="rightIcon">{{rightIcon}}</i>
  </button>
</template>

<script>
import { Builder } from "_PagesSrc/ts/designSystem/Builder";

export default {
  props: {
    id: null,
    text: { default: "Text" },
    variant: { default: "raised" },
    dense: { default: false },
    leftIcon: { default: "" },
    rightIcon: { default: "" }
  },
  computed: {
    buttonClass: function() {
      switch (this.variant) {
        case "text":
          return "";
        case "outlined":
          return " mdc-button--outlined";
        case "raised":
          return " mdc-button--raised";
        case "unelevated":
          return " mdc-button--unelevated";
        default:
          return "";
      }
    },
    denseClass: function() {
      return this.dense ? " mdc-button--dense" : "";
    }
  },
  data: function() {
    return {
      element: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init("WBbutton", 'button' + this._uid);
  }
};
</script>
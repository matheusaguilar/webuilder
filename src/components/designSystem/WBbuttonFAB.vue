<template>
  <button :class="'mdc-fab' + buttonClass + miniClass" :id="id" :data-wbid="'button' + _uid">
    <i class="material-icons mdc-fab__icon" aria-hidden="true" v-if="leftIcon">{{leftIcon}}</i>
    <span class="mdc-fab__label">{{text}}</span>
    <i class="material-icons mdc-fab__icon" aria-hidden="true" v-if="rightIcon">{{rightIcon}}</i>
  </button>
</template>

<script>
import { Builder } from "@src/ts/designSystem/Builder";

export default {
  props: {
    id: null,
    text: { default: "" },
    variant: { default: "standard" },
    mini: { default: false },
    leftIcon: { default: "favorite" },
    rightIcon: { default: "" }
  },
  computed: {
    buttonClass: function() {
      switch (this.variant) {
        case "standard":
          return "";
        case "extended":
          return " mdc-fab--extended";
        default:
          return "";
      }
    },
    miniClass: function() {
      return this.mini ? " mdc-fab--mini" : "";
    }
  },
  data: function() {
    return {
      element: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init("WBbuttonFAB", "button" + this._uid);
  }
};
</script>
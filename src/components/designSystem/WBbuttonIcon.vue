<template>
  <button class="mdc-icon-button" :id="id" :data-wbid="'button' + _uid" @click="changeOn()">
    <i class="material-icons mdc-icon-button__icon">{{on? iconOn : icon}}</i>
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
    icon: { default: "" },
    iconOn: { default: "" }
  },
  data: function() {
    return {
      element: null,
      on: false
    };
  },
  mounted() {
    this.element = Builder.getInstance().init(
      "WBbuttonIcon",
      "button" + this._uid
    );
  },
  methods: {
    changeOn: function(){
      if (this.iconOn){
        this.on = !this.on;
      }
    }
  }
};
</script>
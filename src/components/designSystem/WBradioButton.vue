<template>
  <div class="mdc-form-field" :id="id" :data-wbid="'radiobutton' + _uid">
    <div class="mdc-radio">
      <input
        class="mdc-radio__native-control"
        type="radio"
        :id="'radio-' + _uid"
        name="radios"
        checked
      />
      <div class="mdc-radio__background">
        <div class="mdc-radio__outer-circle"></div>
        <div class="mdc-radio__inner-circle"></div>
      </div>
    </div>
    <label :for="'radio-' + _uid">{{label}}</label>
  </div>
</template>

<script>
import { Builder } from "_PagesSrc/ts/designSystem/Builder";

export default {
  props: {
    id: null,
    label: { default: "Radio Label" }
  },
  data: function() {
    return {
      element: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init("WBradioButton", "radiobutton" + this._uid);
  }
};
</script>

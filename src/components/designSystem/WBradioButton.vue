<template>
  <div class="mdc-form-field" :id="id" :data-wbid="'radiobutton' + _uid">
    <div class="mdc-radio">
      <input
        class="mdc-radio__native-control"
        type="radio"
        :id="'radio-' + _uid"
        name="radios"
        :value="val"
        v-bind:checked="isChecked"
        v-on="inputListeners"
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
import { Builder } from "@src/ts/designSystem/Builder";

export default {
  props: {
    id: null,
    value: { default: null },
    val: { default: null },
    label: { default: "Radio Label" }
  },
  data: function() {
    return {
      element: null
    };
  },
  computed: {
    isChecked: function() {
      return this.value === this.val;
    },
    inputListeners: function () {
      var vm = this;
      return Object.assign({},
        this.$listeners, {
          input: function (event) { // make work with v-model
            vm.$emit('input', vm.val);
          }
        }
      );
    }
  },
  mounted() {
    this.element = Builder.getInstance().init("WBradioButton", "radiobutton" + this._uid);
  }
};
</script>

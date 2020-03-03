<template>
  <div class="text-field-container" :id="id">
    <div :data-wbid="'textarea' + _uid" class="mdc-text-field mdc-text-field--textarea">
      <div class="mdc-text-field-character-counter" v-if="maxlength">0 / {{maxlength}}</div>
      <textarea :id="'textarea-' +  _uid" class="mdc-text-field__input"
        :aria-labelledby="'textarea-label' + _uid" rows="8" cols="40"
        :maxlength="maxlength"
        :required="required? true : false"
        :disabled="disabled"
        :pattern="pattern? pattern: false"
        :title="title? title: false"
        v-bind:value="value"
        v-on="inputListeners"></textarea>
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        <div class="mdc-notched-outline__notch">
          <label class="mdc-floating-label" :id="'textarea-label' + _uid">{{label}}</label>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Builder } from "_PagesSrc/ts/designSystem/Builder";

export default {
  props: {
    id: {default: null},
    value: { default: null },
    label: { default: "Textarea Label" },
    required: { default: null },
    disabled: { default: false },
    pattern: { default: null },
    title: { default: null },
    maxlength: { default: null },
    minlength: { default: null }
  },
  data: function() {
    return {
      element: null,
      elemResolved: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init(
      "WBtextarea",
      "textarea" + this._uid
    );
    this.element.then((elem) => {
      this.elemResolved = elem;
      if (this.minlength) {
        elem.mdc.minLength = this.minlength;
      }
    });
  },
  watch: {
    value: function(value) {
      if (this.elemResolved && this.elemResolved.mdc) {
        this.elemResolved.mdc.value = value;
      }
    }
  },
  computed: {
    inputListeners: function () {
      var vm = this;
      return Object.assign({},
        this.$listeners, {
          input: function (event) { // make work with v-model
            vm.$emit('input', event.target.value);
          }
        }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.text-field-container {
  width: 240px;

  //fix to container
  .mdc-text-field {
    width: 100%;
  }

  textarea {
    resize: none;
  }

}
</style>
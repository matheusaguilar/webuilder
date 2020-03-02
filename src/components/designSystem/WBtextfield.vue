<template>
  <div class="text-field-container" :id="id" :data-wbid="'textfield' + _uid">
    <!--Filled-->
    <div
      :class="'mdc-text-field' + shapedClass + leftIconClass + rightIconClass + disabledClass"
      v-if="variant == 'filled'"
    >
      <i class="material-icons mdc-text-field__icon" v-if="leftIcon">{{leftIcon}}</i>
      <input
        :type="type"
        :id="'textfield-' +  _uid"
        class="mdc-text-field__input"
        :aria-controls="helperId"
        :aria-describedby="helperId"
        :maxlength="maxlength"
        :required="required? true : false"
        :disabled="disabled"
        :pattern="pattern? pattern: false"
        :title="title? title: false"
        v-bind:value="value"
        v-on="inputListeners"
      />
      <label class="mdc-floating-label" :for="'textfield-' +  _uid" v-if="label">{{label}}</label>
      <i class="material-icons mdc-text-field__icon" v-if="rightIcon">{{rightIcon}}</i>
      <div class="mdc-line-ripple"></div>
    </div>

    <!--Outlined-->
    <div
      :class="'mdc-text-field mdc-text-field--outlined' + shapedClass + leftIconClass + rightIconClass + disabledClass"
      v-if="variant == 'outlined'"
    >
      <i class="material-icons mdc-text-field__icon" v-if="leftIcon">{{leftIcon}}</i>
      <input
        :type="type"
        :id="'textfield-' +  _uid"
        class="mdc-text-field__input"
        :aria-controls="helperId"
        :aria-describedby="helperId"
        :maxlength="maxlength"
        :required="required? true : false"
        :disabled="disabled"
        :pattern="pattern? pattern: false"
        :title="title? title: false"
        v-bind:value="value"
        v-on="inputListeners"
      />
      <i class="material-icons mdc-text-field__icon" v-if="rightIcon">{{rightIcon}}</i>
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        <div class="mdc-notched-outline__notch" v-if="label">
          <label for="text-field-hero-input" class="mdc-floating-label">{{label}}</label>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
      </div>
    </div>

    <!--Full-Width-->
    <div :class="'mdc-text-field mdc-text-field--fullwidth' + disabledClass" v-if="variant == 'full-width'">
      <input
        :type="type"
        :id="'textfield-' +  _uid"
        class="mdc-text-field__input"
        :placeholder="label"
        :aria-label="label"
        :aria-controls="helperId"
        :aria-describedby="helperId"
        :maxlength="maxlength"
        :required="required? true : false"
        :disabled="disabled"
        :pattern="pattern? pattern: false"
        :title="title? title: false"
        v-bind:value="value"
        v-on="inputListeners"
      />
    </div>

    <!--HelperLine-->
    <div class="mdc-text-field-helper-line" v-if="helperId || maxlength">
      <p
        class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
        :id="helperId"
        v-if="helperText"
      >{{helperText}}</p>
      <div class="mdc-text-field-character-counter" v-if="maxlength">0 / 1</div>
    </div>
  </div>
</template>

<script>
import { Builder } from "_PagesSrc/ts/designSystem/Builder";

export default {
  props: {
    id: {default: null},
    value: { default: null },
    variant: { default: "filled" },
    label: { default: "Textfield Label" },
    shaped: { default: false },
    leftIcon: { default: "" },
    rightIcon: { default: "" },
    helperText: { default: "" },
    type: { default: "text" },
    required: { default: null },
    disabled: { default: false },
    pattern: { default: null },
    title: { default: null },
    maxlength: { default: null },
    minlength: { default: null }
  },
  computed: {
    shapedClass: function() {
      return this.shaped ? " mdc-shaped" : "";
    },
    leftIconClass: function() {
      return this.leftIcon ? " mdc-text-left-icon" : "";
    },
    rightIconClass: function() {
      return this.rightIcon ? " mdc-text-right-icon" : "";
    },
    disabledClass: function() {
      return this.disabled ? " mdc-text-field--disabled" : "";
    },
    helperId: function() {
      return this.helperText ? "helpertext-" + this._uid : "";
    },
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
  },
  data: function() {
    return {
      element: null,
      elemResolved: null
    };
  },
  watch: {
    value: function(value) {
      if (this.elemResolved && this.elemResolved.mdc) {
        this.elemResolved.mdc.value = value;
      }
    }
  },
  mounted() {
    this.element = Builder.getInstance().init(
      "WBtextfield",
      "textfield" + this._uid
    );
    this.element.then((elem) => {
      this.elemResolved = elem;
      if (this.minlength) {
        elem.mdc.minLength = this.minlength;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.text-field-container {
  width: 240px;

  //fix to container
  .mdc-text-field {
    width: 100%;
  }

  //shaped
  .mdc-shaped {
    border-radius: 16px 16px 0 0;
  }

  .mdc-shaped.mdc-text-field--outlined {
    border-radius: unset;

    .mdc-text-field__input {
      padding-left: 32px;
      padding-right: 0;
    }

    .mdc-notched-outline__leading {
      border-radius: 28px 0 0 28px;
      width: 28px;
    }

    .mdc-notched-outline__notch {
      max-width: calc(100% - 28px * 2);
    }

    .mdc-notched-outline__trailing {
      border-radius: 0 28px 28px 0;
    }
  }

  //lefticon
  @mixin field-icon {
    position: absolute;
    bottom: 16px;
    cursor: pointer;
  }

  .mdc-text-left-icon {
    .mdc-text-field__icon {
      @include field-icon;
      left: 16px;
      right: auto;
    }

    .mdc-text-field__input {
      padding-left: 48px !important;
      padding-right: 16px !important;
    }

    .mdc-floating-label {
      left: 48px;
      right: auto;
    }

    .mdc-notched-outline__notch {
      .mdc-floating-label {
        left: 36px;
        right: auto;
      }
    }
  }

  //righticon
  .mdc-text-right-icon {
    .mdc-text-field__input {
      padding-left: 16px !important;
      padding-right: 48px !important;
    }

    .mdc-text-field__icon {
      @include field-icon;
      left: auto;
      right: 12px;
    }
  }
}
</style>

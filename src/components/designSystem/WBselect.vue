<template>
  <div class="select-container" :id="id" :data-wbid="'select' + _uid">
    <div :class="'mdc-select' + shapedClass" v-if="variant == 'filled'">
      <i class="mdc-select__dropdown-icon"></i>
      <select class="mdc-select__native-control"
        :required="required? true : false"
        v-bind:value="value"
        v-on="inputListeners">
        <option value disabled selected></option>
        <option v-for="(item, index) in items" :value="index" :key="index">{{item}}</option>
      </select>
      <label class="mdc-floating-label">{{label}}</label>
      <div class="mdc-line-ripple"></div>
    </div>

    <div :class="'mdc-select mdc-select--outlined' + shapedClass" v-if="variant == 'outlined'">
      <i class="mdc-select__dropdown-icon"></i>
      <select class="mdc-select__native-control"
        :required="required? true : false"
        v-bind:value="value"
        v-on="inputListeners">
        <option value disabled selected></option>
        <option v-for="(item, index) in items" :value="index" :key="index">{{item}}</option>
      </select>
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        <div class="mdc-notched-outline__notch">
          <label class="mdc-floating-label">{{label}}</label>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Builder } from "@src/ts/designSystem/Builder";

export default {
  props: {
    id: {default: null},
    value: { default: null },
    variant: { default: "filled" },
    label: { default: "Label" },
    shaped: { default: false },
    required: { default: false },
    items: { default: [] }
  },
  computed: {
    shapedClass: function() {
      return this.shaped ? " mdc-shaped" : "";
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
      element: null
    };
  },
  mounted() {
    this.element = Builder.getInstance().init(
      "WBselect",
      "select" + this._uid
    );
  }
};
</script>

<style lang="scss" scoped>
.select-container {
  width: 240px;

  //fix to container
  .mdc-select {
    width: 100%;
  }

  .mdc-shaped {
    border-radius: 17.92px 17.92px 0 0;
  }

  .mdc-select--outlined.mdc-shaped {
    select {
      border-radius: 28px;
      padding-left: 32px;
      padding-right: 52px;
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
}
</style>
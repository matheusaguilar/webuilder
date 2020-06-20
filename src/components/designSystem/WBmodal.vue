<template>
  <div
    class="mdc-dialog"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="my-dialog-title"
    aria-describedby="my-dialog-content"
    :id="id" :data-wbid="'modal' + _uid">
    <div class="mdc-dialog__container">
      <div class="mdc-dialog__surface">
        <h2 class="mdc-dialog__title">{{title}}</h2>
        <div class="mdc-dialog__content">{{text}}</div>
        <footer class="mdc-dialog__actions">
          <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no" @click="noAction">
            <span class="mdc-button__label">{{labelNo}}</span>
          </button>
          <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" @click="yesAction">
            <span class="mdc-button__label">{{labelYes}}</span>
          </button>
        </footer>
      </div>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
import { Builder } from "@src/ts/designSystem/Builder";

export default {
  props: {
    id: null,
    title: { default: 'Dialog Title' },
    text: { default: 'Dialog body text goes here.' },
    labelNo: { default: 'No' },
    labelYes: { default: 'Yes' }
  },
  data: function() {
    return {
      element: null
    };
  },
  methods: {
    noAction: function() {
      this.$emit('no');
    },
    yesAction: function() {
      this.$emit('yes');
    }
  },
  mounted() {
    this.element = Builder.getInstance().init("WBmodal", "modal" + this._uid);
  }
};
</script>
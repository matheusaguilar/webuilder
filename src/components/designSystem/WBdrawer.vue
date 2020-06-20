<template>
  <aside :class="'mdc-drawer mdc-drawer--dismissible ' + paddingTop" id="wbMDCDrawer">
    <div class="mdc-drawer__content">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
import { Builder } from "@src/ts/designSystem/Builder";

export default {
  props: ['topappbar'],
  data: function(){
    return {
      element: null
    }
  },
  mounted(){
    this.element = Builder.getInstance().init('WBdrawer');
  },
  computed: {
    paddingTop: function(){
      return this.topappbar == 'dense'? 'padding-dense' : 'padding-standard';
    }
  }
}
</script>

<style>
body {
  display: flex;
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.padding-standard{
  padding-top: 64px;
}

.padding-dense{
  padding-top: 48px;
}

@media screen and (min-width: 1024px){
  #wbMDCDrawer {
    display: none;
  }
}

@media screen and (max-width: 599px){
  .padding-standard{
    padding-top: 56px;
  }
}
</style>
<template>
  <aside :class="'mdc-drawer mdc-drawer--dismissible ' + paddingTop" id="wbMDCDrawer">
    <div class="mdc-drawer__content">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
import { Builder } from "_PagesSrc/ts/designSystem/Builder";

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

<style lang="scss">
body {
  display: flex;
  height: 100vh;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.app-bar {
  position: absolute;
}

.mdc-top-app-bar {
  z-index: 7;
}

.padding-standard{
  padding-top: 64px;
}

.padding-dense{
  padding-top: 48px;
}

#wbMDCTopAppBarMenuBtn{
  display: none;
}

@media screen and (max-width: 1024px){
  #wbMDCTopAppBarMenuBtn{
    display: block;
  }
}

@media screen and (min-width: 1024px){
  #wbMDCDrawer {
    display: none;
  }
}
</style>
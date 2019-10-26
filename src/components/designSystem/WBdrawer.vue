<template>
  <aside :class="'mdc-drawer mdc-drawer--dismissible ' + paddingTop" id="wbMDCDrawer">
    <div class="mdc-drawer__content">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['topappbar'],
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
</style>
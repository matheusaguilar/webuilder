<template>
    <div :class="'mdc-drawer-app-content ' + paddingTop">
      <main class="main-content" id="wbMDCMainContent">
        <slot></slot>
      </main>
    </div>
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
.main-content {
  overflow: auto;
  height: 100%;
}

.padding-standard{
  padding-top: 64px;
}

.padding-dense{
  padding-top: 48px;
}
</style>
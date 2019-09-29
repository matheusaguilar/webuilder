<template>
    <div class="mdc-drawer-app-content" :style="{ paddingTop: padding_top}">
      <main class="main-content" id="wbMDCMainContent">App Content
        <slot></slot>
      </main>
    </div>
</template>

<script>
export default {
  props: ['topappbar'],
  data: function(){
    return {
      padding_top: '64px'
    }
  },
  methods: {
    updatePadding(){
      switch(this.topappbar){
        case 'standard':
          this.padding_top = '64px';
          break;
        case 'fixed':
          this.padding_top = '64px';
          break;
        case 'dense':
          this.padding_top = '48px';
          break;
      }
    }
  },
  watch: {
    topappbar(){
      this.updatePadding();
    }
  }
}
</script>

<style lang="scss">
.main-content {
  overflow: auto;
  height: 100%;
}
</style>
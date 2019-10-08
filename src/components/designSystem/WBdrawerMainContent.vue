<template>
    <div :class="'mdc-drawer-app-content ' + padding_top">
      <main class="main-content" id="wbMDCMainContent">
        <slot></slot>
      </main>
    </div>
</template>

<script>
export default {
  props: ['topappbar'],
  data: function(){
    return {
      padding_top: 'padding-standard'
    }
  },
  methods: {
    updatePadding(){
      switch(this.topappbar){
        case 'standard':
          this.padding_top = 'padding-standard';
          break;
        case 'fixed':
          this.padding_top = 'padding-standard';
          break;
        case 'dense':
          this.padding_top = 'padding-dense';
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

.padding-standard{
  padding-top: 64px;
}

.padding-dense{
  padding-top: 48px;
}
</style>
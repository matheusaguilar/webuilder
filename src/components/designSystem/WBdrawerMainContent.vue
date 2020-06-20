<template>
    <div :class="'mdc-drawer-app-content ' + paddingTop">
      <main class="main-content" id="wbMDCMainContent">
        <slot></slot>
      </main>
    </div>
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
    this.element = Builder.getInstance().init('WBdrawerMainContent');
  },
  computed: {
    paddingTop: function(){
      return this.topappbar == 'dense'? 'padding-dense' : 'padding-standard';
    }
  }
}
</script>

<style lang="scss" scoped>
.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

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

@media screen and (max-width: 599px){
  .padding-standard{
    padding-top: 56px;
  }
}
</style>
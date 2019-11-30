<template>
  <div :class="'wb-img-background-content ' + postionClass" :id="id">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: null,
    position: {default: 'left'}
  },
  computed: {
    postionClass: function() {
      switch(this.position){
        case 'left':
          return '';
        case 'center':
          return 'wb-img-bgc-center';
        case 'right':
          return 'wb-img-bgc-right';
        default:
          return '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wb-img-background-content {
  position: relative;
  width: 33.3%;
  max-width: 600px;
  min-height: 420px;

  // phone screen
  @media screen and (max-width: 599px){
    width: 100%;
    left: 0%;
  }

  // tablet screen
  @media screen and (min-width: 600px) and (max-width: 719px) {
    width: 50%;
  }
}

.wb-img-bgc-center {
  margin: 0 auto;
}

.wb-img-bgc-right {
  margin-left: auto;
}
</style>
<template>
  <div class="wb-img-background" :id="id" :style="{ backgroundImage: 'url(' + img + ')' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: null,
    img: {default: null}
  }
}
</script>

<style lang="scss" scoped>
.wb-img-background {
  width: 100%;
  min-height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
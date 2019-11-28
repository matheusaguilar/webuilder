<template>
  <div class="card">
    <div class="card-image">
      <img :src="src"/>
    </div>
    <div class="card-content">
      Descrição
    </div>
    <div class="card-action">
      <span>R$ 1.000,00</span>
      <i class="material-icons">add_shopping_cart</i>
    </div>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      src: null
    }
  },
  mounted(){
    const rand = Math.floor(Math.random() * 4);
    switch(rand){
      case 0:
        this.src = 'https://lojamodelo.mkx.com.br/img/products/chromebook-samsung-exynos-5-dual-1-7ghz-1mb-l2-cache-2gb-16gb-led-11-google-chrome-os_1_1200.jpg';
        break;

      case 1:
        this.src = 'https://lojamodelo.mkx.com.br/img/products/computador-pc-all-in--one-hp-intel-core-i5-3330s-8gb-hd-1-tb-pavilion-gravador-de-dvd-leitor-_1_1200.jpg';
        break;

      case 2:
        this.src = 'https://lojamodelo.mkx.com.br/img/products/notebook-sony-vaio-intelr-core-i5-3337u-3-geracao-svf15213cbb-4gb-hd-750gb-155quot-led_1_1200.jpg';
        break;

      default:
        this.src = 'https://lojamodelo.mkx.com.br/img/products/imac-com-teclado-e-mouse-sem-fio-apple-me086bz-processador-core-i5-quad-core-2-7ghz-memoria-8gb-hd-_1_1200.jpg';
        break;
    }
  }
}
</script>

<style lang="scss">
.card {
  position: relative;
  margin: 0.5rem 0 1rem 0;
  background-color: #fff;
  -webkit-transition: -webkit-box-shadow 0.25s;
  transition: -webkit-box-shadow 0.25s;
  transition: box-shadow 0.25s;
  transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
  border-radius: 2px;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);

  &-image {
    position: relative;

    img {
      display: block;
      border-radius: 2px 2px 0 0;
      position: relative;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
    }
  }

  &-content {
    padding: 24px;
    border-radius: 0 0 2px 2px;
    font-weight: bold;
  }

  &-action {
    display: flex;
    padding: 0px 24px 24px 24px;
    border-radius: 0 0 2px 2px;

    i {
      margin-left: auto;
      color: #26a69a;
      font-size: 36px;
    }
  }
}
</style>
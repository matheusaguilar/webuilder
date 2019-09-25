<template>
  <div>
    <!--Standard-->
    <header class=" mdc-top-app-bar" v-if="variant__Options[variant] === 'standard'">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

    <!--Fixed-->
    <header class=" mdc-top-app-bar mdc-top-app-bar--fixed" v-if="variant__Options[variant] === 'fixed'">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

    <!--Short-->
    <header class=" mdc-top-app-bar mdc-top-app-bar--short" v-if="variant__Options[variant] === 'short'">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

  </div>
</template>

<script>
export default {
  props: {
    variant: {default: 0},
    title: {default: 'Title'}
  },
  data: function(){
    return {
      variant__Options: ['standard', 'fixed', 'short']
    }
  }
};
</script>

<style lang="scss">

</style>
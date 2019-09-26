<template>
  <div>
    <!--Standard-->
    <header class=" mdc-top-app-bar" v-if="variant__Options[variant] === 'standard'" :id="'topAppBar' + _uid">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="tttteeste" class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

    <!--Short-->
    <header class=" mdc-top-app-bar mdc-top-app-bar--short" v-if="variant__Options[variant] === 'short'" :id="'topAppBar' + _uid">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

    <!--Short always collapsed-->
    <header class=" mdc-top-app-bar mdc-top-app-bar--short mdc-top-app-bar--short-collapsed" 
      v-if="variant__Options[variant] === 'short-collapsed'" :id="'topAppBar' + _uid">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

    <!--Prominent-->
    <header class=" mdc-top-app-bar mdc-top-app-bar--prominent" v-if="variant__Options[variant] === 'prominent'" :id="'topAppBar' + _uid">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

    <!--Prominent Dense-->
    <header class=" mdc-top-app-bar mdc-top-app-bar--prominent mdc-top-app-bar--dense" 
      v-if="variant__Options[variant] === 'prominent-dense'" :id="'topAppBar' + _uid">
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
    <header class=" mdc-top-app-bar mdc-top-app-bar--fixed" v-if="variant__Options[variant] === 'fixed'" :id="'topAppBar' + _uid">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span> </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <div class="wbuilder-insert"></div>
        </section>
      </div>
    </header>

    <!--Dense-->
    <header class=" mdc-top-app-bar mdc-top-app-bar--dense" v-if="variant__Options[variant] === 'dense'" :id="'topAppBar' + _uid">
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
import {MDCTopAppBar} from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";

export default {
  props: {
    variant: {default: 0},
    title: {default: 'Title'},
    drawerId: {default: ''},
    mainContentId: {default: ''}
  },
  data: function(){
    return {
      variant__Options: ['standard', 'short', 'short-collapsed', 'prominent', 'prominent-dense', 'fixed', 'dense']
    }
  },
  methods: {
    updateDrawer(drawerId, mainContentId){
      const iframe = document.getElementById('deviceFrame');
      if (iframe){
        const header = iframe.contentWindow.document.getElementById('topAppBar' + this._uid);
        const drawerElem = iframe.contentWindow.document.getElementById(drawerId);
        const mainContentElem = iframe.contentWindow.document.getElementById(mainContentId);

        if (!!header && !!drawerElem && !!mainContentElem){
          const topAppBarMdc = MDCTopAppBar.attachTo(header);
          const drawerMdc = MDCDrawer.attachTo(drawerElem);
          topAppBarMdc.setScrollTarget(mainContentElem);

          const elem = iframe.contentWindow.document.getElementById('tttteeste');
          elem.addEventListener('click', ()=>{
            drawerMdc.open = !drawerMdc.open;
          });
        }
      }
    }
  },
  watch: {
    drawerId: function(val){
      if (val){
        this.updateDrawer(val, this.mainContentId);
      }
    },
    mainContentId: function(val){
      if (val){
        this.updateDrawer(this.drawerId, val);
      }
    }
  }
};
</script>

<style lang="scss">

</style>
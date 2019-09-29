<template>
  <div>
    <!--Standard-->
    <header class="mdc-top-app-bar app-bar" v-if="variant === 'standard'" id="wbMDCTopAppBar">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="wbMDCTopAppBarMenuBtn"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded"
          >menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <slot></slot>
        </section>
      </div>
    </header>

    <!--Short
    <header
      class="mdc-top-app-bar app-bar mdc-top-app-bar--short"
      v-if="variant === 'short'"
      id="wbMDCTopAppBar"
    >
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="wbMDCTopAppBarMenuBtn"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded"
          >menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <slot></slot>
        </section>
      </div>
    </header>-->

    <!--Short always collapsed
    <header
      class="mdc-top-app-bar app-bar mdc-top-app-bar--short mdc-top-app-bar--short-collapsed"
      v-if="variant === 'short-collapsed'"
      id="wbMDCTopAppBar"
    >
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="wbMDCTopAppBarMenuBtn"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded"
          >menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <slot></slot>
        </section>
      </div>
    </header>-->

    <!--Prominent
    <header
      class="mdc-top-app-bar app-bar mdc-top-app-bar--prominent"
      v-if="variant === 'prominent'"
      id="wbMDCTopAppBar"
    >
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="wbMDCTopAppBarMenuBtn"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded"
          >menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <slot></slot>
        </section>
      </div>
    </header>-->

    <!--Prominent Dense
    <header
      class="mdc-top-app-bar app-bar mdc-top-app-bar--prominent mdc-top-app-bar--dense"
      v-if="variant === 'prominent-dense'"
      id="wbMDCTopAppBar"
    >
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="wbMDCTopAppBarMenuBtn"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded"
          >menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <slot></slot>
        </section>
      </div>
    </header>-->

    <!--Fixed-->
    <header
      class="mdc-top-app-bar mdc-top-app-bar--fixed"
      v-if="variant === 'fixed'"
      id="wbMDCTopAppBar"
    >
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="wbMDCTopAppBarMenuBtn"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded"
          >menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <slot></slot>
        </section>
      </div>
    </header>

    <!--Dense-->
    <header
      class="mdc-top-app-bar app-bar mdc-top-app-bar--dense"
      v-if="variant === 'dense'"
      id="wbMDCTopAppBar"
    >
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button id="wbMDCTopAppBarMenuBtn"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded"
          >menu</button>
          <span class="mdc-top-app-bar__title">{{title}}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <slot></slot>
        </section>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    variant: { default: "standard" },
    title: { default: "Title" }
  }
};
</script>
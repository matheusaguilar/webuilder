<template>
  <aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust" id="wbMDCDrawer">
    <div class="mdc-drawer__content">
      <slot></slot>

      <div class="mdc-list">
        <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
          <span class="mdc-list-item__text">Inbox</span>
        </a>
        <a class="mdc-list-item" href="#">
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
          <span class="mdc-list-item__text">Outgoing</span>
        </a>
        <a class="mdc-list-item" href="#">
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
          <span class="mdc-list-item__text">Drafts</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
body {
  display: flex;
  height: 100vh;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.app-bar {
  position: absolute;
}

.mdc-top-app-bar {
  z-index: 7;
}
</style>
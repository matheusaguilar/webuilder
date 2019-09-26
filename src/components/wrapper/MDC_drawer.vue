<template>
  <div>
    <aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust" id="drawwwww">
      <div class="mdc-drawer__content">
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

    <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
      <main class="main-content" id="main-content">App Content
        <div class="wbuilder-insert"></div>
      </main>
    </div>
  </div>
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

.main-content {
  overflow: auto;
  height: 100%;
}

.app-bar {
  position: absolute;
}

.mdc-top-app-bar {
  z-index: 7;
}
</style>
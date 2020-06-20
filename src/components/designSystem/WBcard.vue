<template>
  <div class="mdc-card-container" :id="id" :data-wbid="'card' + _uid">
    <!--Basic-->
    <div class="mdc-card mdc-basic-card" v-if="variant == 'basic'">
      <div class="mdc-card__primary-action" @click="$emit('click')">
        <div class="mdc-card__media mdc-card__media--16-9" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
        <div class="mdc-card__primary" v-if="title || subtitle">
          <h2
            class="mdc-card__title mdc-typography mdc-typography--headline6"
            v-if="title"
          >{{title}}</h2>
          <h3
            class="mdc-card__subtitle mdc-typography mdc-typography--subtitle2"
            v-if="subtitle"
          >{{subtitle}}</h3>
        </div>
        <div
          class="mdc-card__secondary mdc-typography mdc-typography--body2"
          v-if="description"
        >{{description}}</div>
      </div>

      <div class="mdc-card__actions" v-if="action">
        <div class="mdc-card__action-buttons">
          <slot></slot>
        </div>
      </div>
    </div>

    <!--Text Over Media-->
    <div class="mdc-card mdc-basic-overmedia" v-if="variant == 'basic-overmedia'">
      <div class="mdc-card__primary-action" @click="$emit('click')">
        <div class="mdc-card__media mdc-card__media--16-9" :style="{ backgroundImage: 'url(' + img + ')' }">
          <div class="mdc-card__media-content mdc-overmedia-card__media-content">
            <div class="mdc-card__primary mdc-overmedia-card__primary">
              <h2
                class="mdc-card__title mdc-typography mdc-typography--headline6"
                v-if="title"
              >{{title}}</h2>
              <h3
                class="mdc-card__subtitle mdc-typography mdc-typography--subtitle2"
                v-if="subtitle"
              >{{subtitle}}</h3>
            </div>
          </div>
        </div>
        <div
          class="mdc-card__secondary mdc-overmedia-card__secondary mdc-typography mdc-typography--body2"
          v-if="description"
        >{{description}}</div>
      </div>
      <div class="mdc-card__actions" v-if="action">
        <div class="mdc-card__action-buttons">
          <slot></slot>
        </div>
      </div>
    </div>

    <!--Header-->
    <div class="mdc-card mdc-basic-header" v-if="variant == 'basic-header'">
      <div class="mdc-card__primary">
        <h2 class="mdc-card__title mdc-typography mdc-typography--headline6" v-if="title">{{title}}</h2>
        <h3
          class="mdc-card__subtitle mdc-typography mdc-typography--subtitle2"
          v-if="subtitle"
        >{{subtitle}}</h3>
      </div>
      <div class="mdc-card__primary-action" @click="$emit('click')">
        <div class="mdc-card__media mdc-card__media--16-9" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
        <div
          class="mdc-card__secondary mdc-header-card__secondary mdc-typography mdc-typography--body2"
          v-if="description"
        >{{description}}</div>
      </div>
      <div class="mdc-card__actions" v-if="action">
        <div class="mdc-card__action-buttons">
          <slot></slot>
        </div>
      </div>
    </div>

    <!--ImageText-->
    <div class="mdc-card mdc-image-text" v-if="variant == 'image-text'">
      <div class="mdc-card__primary-action" @click="$emit('click')">
        <div class="mdc-card__media mdc-card__media--square" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
        <div class="mdc-card__primary">
          <h2
            class="mdc-card__title mdc-typography mdc-typography--headline6"
            v-if="title"
          >{{title}}</h2>
          <h3
            class="mdc-card__subtitle mdc-typography mdc-typography--subtitle2"
            v-if="subtitle"
          >{{subtitle}}</h3>
        </div>
      </div>
      <div class="mdc-card__actions" v-if="action">
        <div class="mdc-card__action-buttons">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Builder } from "@src/ts/designSystem/Builder";

export default {
  props: {
    id: null,
    variant: { default: "basic" },
    img: { default: null },
    title: { default: "Title" },
    subtitle: { default: "SubTitle" },
    description: { default: "Description" },
    action: { default: true }
  },
  data: function() {
    return {
      element: null
    };
  },
  mounted() {
    
    this.element = Builder.getInstance().init(
      "WBcard",
      "card" + this._uid
    );
  }
};
</script>

<style lang="scss" scoped>
.mdc-card-container {
  max-width: 100%;

  .mdc-card__primary {
    padding: 1rem;

    .mdc-card__title {
      margin: 0;
    }

    .mdc-card__subtitle {
      margin: 0;
    }
  }

  .mdc-card__secondary {
    padding: 0 1rem 8px;
  }

  .mdc-card__secondary,
  .mdc-card__subtitle {
    color: rgba(0, 0, 0, 0.54);
    color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54));
  }
}

//basic

//basic-overmedia
.mdc-basic-overmedia {
  .mdc-overmedia-card__media-content {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: end;
    align-items: flex-end;
  }

  .mdc-overmedia-card__primary {
    color: white;

    .mdc-card__subtitle {
      color: white;
    }
  }

  .mdc-overmedia-card__secondary {
    padding-top: 1rem;
  }
}

//basic-header
.mdc-basic-header {
  .mdc-header-card__secondary {
    padding-top: 1rem;
  }
}

//image-text
.mdc-image-text {
  .mdc-card__primary-action {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;

    .mdc-card__media--square {
      width: 110px;
    }
  }
}
</style>
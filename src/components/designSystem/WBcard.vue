<template>
    <div class="mdc-card-container">
        <!--Basic-->
        <div class="mdc-card mdc-basic-card" :id="id" v-if="variant == 'basic'">
            <div class="mdc-card__primary-action">
                <div class="mdc-card__media mdc-card__media--16-9 mdc-card-bgimg"></div>
                <div class="mdc-basic-card__primary" v-if="title || subtitle">
                    <h2 class="mdc-basic-card__title mdc-typography mdc-typography--headline6" v-if="title">{{title}}</h2>
                    <h3 class="mdc-basic-card__subtitle mdc-typography mdc-typography--subtitle2" v-if="subtitle">{{subtitle}}</h3>
                </div>
                <div class="mdc-basic-card__secondary mdc-typography mdc-typography--body2" v-if="description">{{description}}</div>
            </div>

            <div class="mdc-card__actions" v-if="action">
                <div class="mdc-card__action-buttons">
                    <slot></slot>
                </div>
            </div>
        </div>

        <!--Text Over Media-->
        <div class="mdc-card mdc-text-over-media" :id="id" v-if="variant == 'text over media'">
            <div class="mdc-card__primary-action">
                <div class="mdc-card__media mdc-card__media--16-9 mdc-card-bgimg">
                    <div class="mdc-card__media-content mdc-text-over-card__media-content">
                        <div class="mdc-text-over-card__primary">
                            <h2 class="mdc-text-over-card__title mdc-typography mdc-typography--headline6" v-if="title">{{title}}</h2>
                            <h3 class="mdc-text-over-card__subtitle mdc-typography mdc-typography--subtitle2" v-if="subtitle">{{subtitle}}</h3>
                        </div>
                    </div>
                </div>
                <div class="mdc-text-over-card__secondary mdc-typography mdc-typography--body2" v-if="description">{{description}}</div>
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
export default {
    props: {
        id: null,
        variant: { default: 'basic' },
        title: { default: 'Title' },
        subtitle: { default: 'SubTitle' },
        description: { default: 'Description' },
        action: { default: true }
    }
}
</script>

<style lang="scss">
.mdc-card-container{
    max-width: 350px;
}

.mdc-card-bgimg {
    background-image: url('https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg');
}

//basic
.mdc-basic-card {
    .mdc-basic-card__primary {
        padding: 1rem;

        .mdc-basic-card__title {
            margin: 0;
        }

        .mdc-basic-card__subtitle {
            margin: 0;
        }
    }

    .mdc-basic-card__secondary {
        padding: 0 1rem 8px;
    }

    .mdc-basic-card__secondary, .mdc-basic-card__subtitle {
        color: rgba(0,0,0,.54);
        color: var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54));
    }
}

//text over media
.mdc-text-over-media {
    margin: 48px 0;

    .mdc-text-over-card__media-content {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: end;
        align-items: flex-end;
    }

    .mdc-text-over-card__primary {
        padding: 1rem;
        color: white;

        .mdc-text-over-card__title {
            margin: 0;
        }

        .mdc-text-over-card__subtitle{
            margin: 0;
        }
    }

    .mdc-text-over-card__secondary{
        padding: 0 1rem 8px;
        padding-top: 1rem;
        color: rgba(0,0,0,.54);
        color: var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54));
    }
        
}
</style>
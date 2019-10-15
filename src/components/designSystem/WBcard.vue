<template>
    <div class="mdc-card-container">
        <!--Basic-->
        <div class="mdc-card mdc-basic-card" :id="id" v-if="variant == 'basic'">
            <div class="mdc-card__primary-action mdc-basic-card__primary-action" tabindex="0">
                <div class="mdc-card__media mdc-card__media--16-9" style="background-image: url(&quot;https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg&quot;);"></div>
                <div class="mdc-basic-card__primary">
                <h2 class="mdc-basic-card__title mdc-typography mdc-typography--headline6">Our Changing Planet</h2>
                <h3 class="mdc-basic-card__subtitle mdc-typography mdc-typography--subtitle2">by Kurt Wagner</h3>
                </div>
                <div class="mdc-basic-card__secondary mdc-typography mdc-typography--body2">Visit ten places on our planet that are undergoing the biggest changes today.</div>
            </div>

            <div class="mdc-card__actions" v-if="action">
                <div class="mdc-card__action-buttons">
                    
                </div>

                <div class="mdc-card__action-icons">

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
        action: { default: false }
    }
}
</script>

<style lang="scss">
.mdc-card-container{
    max-width: 350px;
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
</style>
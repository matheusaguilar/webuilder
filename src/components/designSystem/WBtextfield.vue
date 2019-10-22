<template>
    <div class="text-field-container" :id="id">
        <!--Filled-->
        <div class="mdc-text-field mdc-shaped" v-if="variant == 'filled'">
            <input type="text" :id="'textfield-' +  _uid" class="mdc-text-field__input">
            <label class="mdc-floating-label" :for="'textfield-' +  _uid" v-if="label">{{label}}</label>
            <div class="mdc-line-ripple"></div>
        </div>

        <!--Outlined-->
        <div class="mdc-text-field mdc-text-field--outlined" v-if="variant == 'outlined'">
            <input class="mdc-text-field__input" id="text-field-hero-input">
            <div class="mdc-notched-outline">
                <div class="mdc-notched-outline__leading"></div>
                <div class="mdc-notched-outline__notch" v-if="label">
                    <label for="text-field-hero-input" class="mdc-floating-label">{{label}}</label>
                </div>
                <div class="mdc-notched-outline__trailing"></div>
            </div>
        </div>

        <!--Full-Width-->
        <div class="mdc-text-field mdc-text-field--fullwidth" v-if="variant == 'full-width'">
        <input class="mdc-text-field__input" type="text"
            :placeholder="label"
            :aria-label="label">
        </div>

        <!-- <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--no-label">
            <input type="text" class="mdc-text-field__input" aria-label="Label">
            <div class="mdc-notched-outline">
                <div class="mdc-notched-outline__leading"></div>
                <div class="mdc-notched-outline__trailing"></div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        id: null,
        variant: { default: 'filled' },
        label: { default: 'Textfield Label' }
    }
}
</script>

<style lang="scss">
.text-field-container{
    width: 240px;

    .mdc-text-field {
        width: 100%;
    }

    .mdc-shaped {
        border-radius: 16px 16px 0 0;
    }
}
</style>

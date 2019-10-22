<template>
    <div class="text-field-container" :id="id">
        <!--Filled-->
        <div class="mdc-text-field">
            <input type="text" :id="'textfield-' +  _uid" class="mdc-text-field__input">
                <label class="mdc-floating-label" :for="'textfield-' +  _uid">{{label}}</label>
            <div class="mdc-line-ripple"></div>
        </div>

        <!--Outlined-->
        <!-- <div class="mdc-text-field mdc-text-field--outlined">
            <input class="mdc-text-field__input" id="text-field-hero-input">
            <div class="mdc-notched-outline">
                <div class="mdc-notched-outline__leading"></div>
                <div class="mdc-notched-outline__notch">
                <label for="text-field-hero-input" class="mdc-floating-label">Name</label>
                </div>
                <div class="mdc-notched-outline__trailing"></div>
            </div>
        </div> -->

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
}
</style>

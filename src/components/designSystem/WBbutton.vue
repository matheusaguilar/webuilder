<template>
    <button :class="'mdc-button' + buttonClass + denseClass" :id="id">
        <i class="material-icons mdc-button__icon" aria-hidden="true" v-if="leftIcon">{{leftIcon}}</i>
        <span class="mdc-button__label">{{text}}</span>
        <i class="material-icons mdc-button__icon" aria-hidden="true" v-if="rightIcon">{{rightIcon}}</i>
    </button>
</template>

<script>
export default {
    props: {
        id: null,
        text: { default: 'Text' },
        variant: { default: 'raised' },
        dense: { default: false },
        leftIcon: { default: '' },
        rightIcon: { default: '' }
    },
    computed: {
        buttonClass: function(){
            switch(this.variant){
                case 'text':
                    return '';
                case 'outlined':
                    return ' mdc-button--outlined';
                case 'raised':
                    return ' mdc-button--raised';
                case 'unelevated':
                    return ' mdc-button--unelevated';
                default:
                    return '';
            }
        },
        denseClass: function(){
            return this.dense? ' mdc-button--dense' : '';
        }
    }
}
</script>

<style lang="scss">

</style>
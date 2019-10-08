<template>
    <div>
        <button :class="'mdc-button' + denseClass" v-if="variant === 'text'" :id="id">
            <span class="mdc-button__label">{{text}}</span>
        </button>

        <button :class="'mdc-button mdc-button--outlined' + denseClass" v-if="variant === 'outlined'" :id="id">
            <span class="mdc-button__label">{{text}}</span>
        </button>

        <button :class="'mdc-button mdc-button--raised' + denseClass" v-if="variant === 'raised'" :id="id">
            <span class="mdc-button__label">{{text}}</span>
        </button>

        <button :class="'mdc-button mdc-button--unelevated' + denseClass" v-if="variant === 'unelevated'" :id="id">
            <span class="mdc-button__label">{{text}}</span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        id: null,
        text: { default: 'Text' },
        variant: { default: 'raised' },
        dense: { default: 'no' }
    },
    data(){
        return{
            denseClass: ''
        }
    },
    watch: {
        dense(newVal, oldVal){
            if (newVal == 'yes'){
                this.denseClass = ' mdc-button--dense';
            } else{
                this.denseClass = '';
            }
        }
    }
}
</script>

<style lang="scss">

</style>
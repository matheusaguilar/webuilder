<template>
    <button :class="'mdc-chip' + chipClass" :id="id">
        <i class="material-icons mdc-chip__icon mdc-chip__icon--leading" v-if="leftIcon">{{leftIcon}}</i>
        <span class="mdc-chip__text">{{text}}</span>
    </button>
</template>

<script>
export default {
    props: {
        id: null,
        text: { default: 'Text' },
        variant: { default: 'round' },
        leftIcon: { default: 'alarm' }
    },
    computed: {
        chipClass: function(){
            if (this.variant == 'shaped'){
                return ' mdc-chip-shaped';
            } 
            return '';
        }
    }
}
</script>

<style lang="scss">
.mdc-chip-shaped {
    border-radius: 4px;
}
</style>
<template>
    <div :class="classes" :id="id">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:{
        id: null,
        desktop: {default: '12'},
        tablet: {default: '8'},
        phone: {default: '4'}
    },
    computed: {
        classes: function(){
            return `mdc-layout-grid__cell--span-${this.desktop}-desktop`
            + ` mdc-layout-grid__cell--span-${this.tablet}-tablet`
            + ` mdc-layout-grid__cell--span-${this.phone}-phone`;
        }
    }
}
</script>
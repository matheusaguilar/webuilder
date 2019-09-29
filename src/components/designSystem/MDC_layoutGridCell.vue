<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:{
        desktop: {default: '12'},
        tablet: {default: '8'},
        phone: {default: '4'}
    },
    data: function(){
        return{
            classes: null
        }
    },
    created(){
        this.changeClass();
    },
    methods: {
        changeClass(){
            this.classes= `mdc-layout-grid__cell--span-${this.desktop}-desktop`
            + ` mdc-layout-grid__cell--span-${this.tablet}-tablet`
            + ` mdc-layout-grid__cell--span-${this.phone}-phone`;
        }
    },
    watch: {
        desktop: function (val) {
            this.changeClass();
        },
        tablet: function (val) {
            this.changeClass();
        },
        phone: function (val) {
            this.changeClass();
        }
    }
}
</script>
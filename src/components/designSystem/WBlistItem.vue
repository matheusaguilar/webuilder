<template>
    <li :class="'mdc-list-item' + twoLineClass" :id="id">
        <span class="mdc-list-item__graphic material-icons" aria-hidden="true" v-if="leftIcon">{{leftIcon}}</span>
        <span class="mdc-list-item__text">
            <span v-if="!secondaryText">{{primaryText}}</span>
            <div v-else>
                <span class="mdc-list-item__primary-text">{{primaryText}}</span>
                <span class="mdc-list-item__secondary-text">{{secondaryText}}</span>
            </div>
        </span>
    </li>
</template>

<script>
export default {
    props: {
        id: null,
        primaryText: { default: 'Primary Text' },
        secondaryText: { default: '' },
        leftIcon: { default: '' }
    },
    computed: {
        twoLineClass: function() {
            return this.secondaryText? ' list--two-line-item' : '';
        }
    }
}
</script>

<style lang="scss">
.list--two-line-item{
    height: 72px;

    .mdc-list-item__graphic {
        margin-left: 0;
        margin-right: 16px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .mdc-list-item__text{
        -ms-flex-item-align: start;
        align-self: flex-start;
    }

}
</style>
<template>
    <button class="mdc-icon-button" :id="id">
        <i class="material-icons mdc-icon-button__icon">{{iconOn}}</i>
        <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on" v-if="icon">{{icon}}</i>
    </button>
</template>

<script>
export default {
    props: {
        id: null,
        icon: { default: 'favorite' },
        iconOn: { default: 'favorite_border' }
    }
}
</script>
<template>
    <button class="mdc-icon-button" :id="id">
        <i class="material-icons mdc-icon-button__icon">{{icon}}</i>
        <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on" v-if="iconOn">{{iconOn}}</i>
    </button>
</template>

<script>
export default {
    props: {
        id: null,
        icon: { default: 'favorite_border' },
        iconOn: { default: 'favorite' }
    }
}
</script>
<template>
    <ul class="mdc-list" :id="id">
        <slot></slot>
    </ul>
</template>

<script>
export default {
    props: ['id']
}
</script>
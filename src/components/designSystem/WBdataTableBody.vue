<template>
    <tbody class="mdc-data-table__content" :id="id">
        <slot></slot>
    </tbody>
</template>

<script>
export default {
    props: ['id']
}
</script>
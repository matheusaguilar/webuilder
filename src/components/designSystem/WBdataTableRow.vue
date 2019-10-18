<template>
    <tr class="mdc-data-table__row" :id="id">
        <slot></slot>
    </tr>
</template>

<script>
export default {
    props: ['id']
}
</script>
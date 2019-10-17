<template>
    <thead :id="id">
        <tr class="mdc-data-table__header-row">
            <slot></slot>
        </tr>
    </thead>
</template>

<script>
export default {
    props: ['id']
}
</script>
<template>
    <div class="mdc-data-table" :id="id">
        <table class="mdc-data-table__table">
            <slot></slot>
        </table>
    </div>
</template>

<script>
export default {
    props: ['id']
}
</script>
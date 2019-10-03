<template>
    <div class="mdc-layout-grid" :id="id">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['id']
}
</script>
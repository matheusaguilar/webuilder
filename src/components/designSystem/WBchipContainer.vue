<template>
    <div class="mdc-chip-set" :id="id">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['id']
}
</script>
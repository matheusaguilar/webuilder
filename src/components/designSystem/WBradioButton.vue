<template>
    <div class="mdc-form-field" :id="id">
        <div class="mdc-radio">
            <input class="mdc-radio__native-control" type="radio" :id="'radio-' + _uid" name="radios" checked>
            <div class="mdc-radio__background">
            <div class="mdc-radio__outer-circle"></div>
            <div class="mdc-radio__inner-circle"></div>
            </div>
        </div>
        <label :for="'radio-' + _uid">{{label}}</label>
    </div>
</template>

<script>
export default {
    props: {
        id: null,
        label: { default: 'Radio Label' }
    }
}
</script>

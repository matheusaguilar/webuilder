<template>
    <th :class="cellClass + numericClass" 
        :role="variant == 'header' ? 'columnheader' : ''" 
        :scope="variant == 'header' ? 'col' : ''" :id="id">
        {{text}}
    </th>
</template>

<script>
export default {
    props: {
        id: { default: null },
        variant: { default: 'header' },
        text: { default: 'Text' },
        numeric: { default: false }
    },
    computed: {
        cellClass: function(){
            return this.variant == 'header'? 'mdc-data-table__header-cell' : 'mdc-data-table__cell';
        },
        numericClass: function(){
            return this.numeric? ' mdc-data-table__header-cell--numeric' : '';
        }
    }
}
</script>
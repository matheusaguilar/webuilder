<template>
    <div>
        <div class="wb-item-device-elements"  v-on:drop="emitDrop"
            v-on:dragover="allowDropComponent($event)">
            <a :id="'item' + _uid" class="mdc-list-item" href="#" v-bind:class="{ active: element == elementSelected }"
                @click="emitClick">
                <span class="mdc-list-item__text">{{element.name}}</span>
            </a>
            <i class="material-icons"
                v-show="element.children.length > 0" @click="showChildren = !showChildren">
                {{showChildren? 'expand_less' : 'expand_more' }}</i>
        </div>

        <CompTree :element="elem" :elementSelected="elementSelected" :level="level + 1"
            v-for="(elem, index) in element.children" :key="index" v-show="showChildren"
            @clicked="emitClick" @drop="emitDrop"/>
    </div>
</template>

<script lang="ts">

declare module 'vue/types/vue' {
  interface Vue {
    _uid: number
  }
}

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CompTree extends Vue {
    @Prop() element!: any;
    @Prop() elementSelected!: any;
    @Prop() level!: number;

    showChildren = true;

    mounted(){
        if (this.level){
            const elem = document.getElementById('item' + this._uid);
            if (elem) {
                elem.style.marginLeft = (24 * this.level) + 'px'; 
            }
        }
    }

    emitClick(value: any){
        if (value instanceof Event){
            this.$emit('clicked', this.element.element);
        } else{
            this.$emit('clicked', value);
        }
    }

    emitDrop(value: any){
        if (value instanceof Event){
            this.$emit('drop', {event: value, element: this.element.element});
        } else{
            this.$emit('drop', value);
        }
    }

    allowDropComponent(event: Event) {
        event.preventDefault();
    }

}
</script>

<style lang="scss">
.wb-item-device-elements{
    display: flex;

    .mdc-list-item{
        font-size: 12px;
    }

    .material-icons{
        margin-top: 10px;
        font-size: 20px;
        cursor: pointer;
    }

}
</style>
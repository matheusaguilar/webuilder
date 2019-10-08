<template>
  <div v-if="this.component">
    <div v-for="(prop, index) in propLabels" :key="index">
      <div class="wb-prop-elem">
        <label :for="'input' + index">{{prop}}:</label>

        <h5 v-if="typeof propValues[index] === 'object'" style="margin: 10px 0px">
          <select @change="changeProps(index, $event)">
            <option v-for="(item, itemIndex) in propValues[index].options" :key="itemIndex"
              :selected="propValues[index].value === itemIndex">{{item}}</option>
          </select>
        </h5>

        <input v-else type="text" class="clean-slide" :id="'input' + index" 
          :value="propValues[index]" @change="changeProps(index, $event)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class CompProps extends Vue {
  @Prop() component!: any;

  propLabels: any = [];
  propValues: any = [];

  changeProps(index: number, event: any){
    if (typeof this.propValues[index] === 'object'){ //Select
      this.component.instance[this.propLabels[index]] = this.propValues[index].options.indexOf(event.target.value);
    } else{ //Input
      this.component.instance[this.propLabels[index]] = event.target.value;
    }
    this.$emit('changeprop', this.component.element);
  }

  @Watch('component')
  componentChange(val: any, oldVal: any) {
    this.propLabels = [];
    this.propValues = [];
    
    if (val){
      const instance = val.instance;

      if (instance.$options.props){
        this.propLabels = Object.keys(instance.$options.props);
        for(var i=0; i<this.propLabels.length; i++){
          if (instance.$data[this.propLabels[i] + '__Options']){ //Select
            this.propValues.push({
              options: instance.$data[this.propLabels[i] + '__Options'],
              value: instance[this.propLabels[i]]
            });

          } else{ //Input
            this.propValues.push(instance[this.propLabels[i]]);
          }
        }
      } else{
        this.propLabels = [];
        this.propValues = [];
      }
    }
  }

}
</script>

<style lang="scss">
.wb-prop-elem{
  width: 180px;
  margin: 0 auto;
  margin-bottom: 12px;


  .clean-slide {
    width: 170px;
    height: 24px;
    margin-top: 4px;

    &:focus{
      outline: none !important;
    }
  }

  select{
    width: 175px;
    height: 24px;

    &:focus{
      outline: none !important;
    }
  }
 
}

</style>
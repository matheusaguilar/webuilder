<template>
  <div v-if="this.component">
    <div v-for="(prop, index) in propLabels" :key="index">
      <div class="wb-prop-elem">
        <label :for="'input' + index">{{prop}}:</label>

        <!--Select-->
        <h5 v-if="typeof propValues[index] === 'object' && propValues[index].type == 'select'" style="margin: 10px 0px">
          <select @change="changeProps(index, $event)">
            <option
              v-for="(item, itemIndex) in propValues[index].options"
              :key="itemIndex"
              :selected="propValues[index].value === itemIndex"
            >{{item}}</option>
          </select>
        </h5>

        <!--Checkbox-->
        <label class="container" v-else-if="typeof propValues[index] === 'object' && propValues[index].type == 'checkbox'">
          <input type="checkbox" :id="'input' + index" :checked="propValues[index].value"
            @change="changeProps(index, $event)">
          <span class="checkmark"></span>
        </label>

        <!--Input-->
        <input
          v-else
          type="text"
          class="clean-slide"
          :id="'input' + index"
          :value="propValues[index]"
          @change="changeProps(index, $event)"
        />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class CompProps extends Vue {
  @Prop() component!: any;

  propLabels: any = [];
  propValues: any = [];

  changeProps(index: number, event: any) {
    if (typeof this.propValues[index] === "object") {
      if (this.propValues[index].type == "select") { //Select
        this.component.instance[this.propLabels[index]] = this.propValues[
          index
        ].options.indexOf(event.target.value);
      } else { //Checkbox
        this.propValues[index].value = !this.propValues[index].value;
        this.component.instance[this.propLabels[index] + '__Check'] = this.propValues[index].value;
      }

    } else { //Input
      this.propValues[index] = event.target.value;
      this.component.instance[this.propLabels[index]] = event.target.value;
    }
    this.$emit("changeprop", this.component.element);
  }

  @Watch("component")
  componentChange(val: any, oldVal: any) {
    this.propLabels = [];
    this.propValues = [];

    if (val) {
      const instance = val.instance;

      if (instance.$options.props) {
        this.propLabels = Object.keys(instance.$options.props);
        for (var i = 0; i < this.propLabels.length; i++) {
          if (instance.$data[this.propLabels[i] + "__Options"] != undefined) {
            this.propValues.push({
              type: "select",
              options: instance.$data[this.propLabels[i] + "__Options"],
              value: instance[this.propLabels[i]]
            });
          } else if (instance.$data[this.propLabels[i] + "__Check"] != undefined) {
            //Checkbox
            this.propValues.push({
              type: "checkbox",
              value: instance.$data[this.propLabels[i] + "__Check"]
            });

          } else {
            //Input
            this.propValues.push(instance[this.propLabels[i]]);
          }
        }
      } else {
        this.propLabels = [];
        this.propValues = [];
      }
    }
  }
}
</script>

<style lang="scss">
.wb-prop-elem {
  width: 180px;
  margin: 0 auto;
  margin-bottom: 12px;

  label {
    font-weight: bold;
  }

  .clean-slide {
    width: 170px;
    height: 24px;
    margin-top: 4px;

    &:focus {
      outline: none !important;
    }
  }

  select {
    width: 175px;
    height: 24px;

    &:focus {
      outline: none !important;
    }
  }

  .container {
    height: 25px;
    margin-top: 5px;
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  .container input:checked ~ .checkmark {
    background-color: #6200ee;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>
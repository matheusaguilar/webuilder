<template>
  <WBdataTable>
      <WBdataTableHead>
        <div class="wbuilder-insert"></div>
      </WBdataTableHead>
      <WBdataTableBody>
        <div class="wbuilder-insert"></div>
      </WBdataTableBody>
  </WBdataTable>
</template>

<script>
import WBdataTable from "../designSystem/WBdataTable";
import WBdataTableHead from "../designSystem/WBdataTableHead";
import WBdataTableBody from "../designSystem/WBdataTableBody";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBdataTable,
    WBdataTableHead,
    WBdataTableBody
  },
  props: {
    variant: { default: 0 },
    __wbInsertSlot: { default: 0 }
  },
  data: function() {
    return {
      variant__Options: [
        'standard'
      ],
      __wbInsertSlot__Options: ['0', '1']
    };
  },
  methods: {
    wbGetTag(){
      return ['WBdataTable', 'WBdataTableHead', 'WBdataTableBody'];
    },
    wbGetHTML(elem){
      let htmlComp = `\n<${this.wbGetTag()[0]}>`;

      // slot 0
      htmlComp += WrapperUtil.getInstance().getTag([this.wbGetTag()[1]], null, elem, true, 0);

      // slot 1
      htmlComp += WrapperUtil.getInstance().getTag([this.wbGetTag()[2]], null, elem, true, 1);

      htmlComp += `\n</${this.wbGetTag()[0]}>`;

      return htmlComp;
    }
  }
};
</script>
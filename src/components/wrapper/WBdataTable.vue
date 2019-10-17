<template>
    <WBdataTable>
        <WBdataTableHead>
            <!-- <div class="wbuilder-insert"></div> -->
            <WBdataTableHColumn></WBdataTableHColumn>
            <WBdataTableHColumn></WBdataTableHColumn>
            <WBdataTableHColumn></WBdataTableHColumn>
            <WBdataTableHColumn></WBdataTableHColumn>
        </WBdataTableHead>
    </WBdataTable>
</template>

<script>
import WBdataTable from "../designSystem/WBdataTable";
import WBdataTableHead from "../designSystem/WBdataTableHead";
import WBdataTableHColumn from "../designSystem/WBdataTableHColumn";

import { WrapperUtil } from "./../../pages_src/ts/wrapperUtil";

export default {
  components: {
    WBdataTable,
    WBdataTableHead,
    WBdataTableHColumn
  },
  methods: {
    wbGetTag(){
      return ['WBdataTable', 'WBdataTableHead'];
    },
    wbGetHTML(elem){
      // slot 0
        //   let htmlComp = WrapperUtil.getInstance().getTag([this.wbGetTag()[0]], 
        //     [`title="${this.title}" variant="${this.variant__Options[this.variant]}"`], elem, true, 0);

        //   // slot 1
        //   htmlComp += WrapperUtil.getInstance().getTag([this.wbGetTag()[1]], 
        //     [`topappbar="${this.variant__Options[this.variant]}"`], elem, true, 1);

        //   // slot 2
        //   htmlComp += WrapperUtil.getInstance().getTag([this.wbGetTag()[2]], 
        //     [`topappbar="${this.variant__Options[this.variant]}"`], elem, true, 2);

      return '';
    }
  }
};
</script>
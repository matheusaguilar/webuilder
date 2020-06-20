import WBtopAppBar from '@components/wrapper/WBtopAppBar.vue';
import WBimgBackground from '@components/wrapper/WBimgBackground.vue';
import WBimgBackgroundContent from '@components/wrapper/WBimgBackgroundContent.vue';
import WBlayoutGrid from '@components/wrapper/WBlayoutGrid.vue';
import WBlayoutGridCell from '@components/wrapper/WBlayoutGridCell.vue';
import WBbutton from '@components/wrapper/WBbutton.vue';
import WBbuttonFAB from '@components/wrapper/WBbuttonFAB.vue';
import WBbuttonIcon from '@components/wrapper/WBbuttonIcon.vue';
import WBchipContainer from '@components/wrapper/WBchipContainer.vue';
import WBchip from '@components/wrapper/WBchip.vue';
import WBcard from '@components/wrapper/WBcard.vue';
import WBdataTable from '@components/wrapper/WBdataTable.vue';
import WBdataTableRow from '@components/wrapper/WBdataTableRow.vue';
import WBdataTableColumn from '@components/wrapper/WBdataTableColumn.vue';
import WBmodal from '@components/wrapper/WBmodal.vue';
import WBcheckbox from '@components/wrapper/WBcheckbox.vue';
import WBradioButton from '@components/wrapper/WBradioButton.vue';
import WBtextfield from '@components/wrapper/WBtextfield.vue';
import WBtextarea from '@components/wrapper/WBtextarea.vue';
import WBselect from '@components/wrapper/WBselect.vue';
import WBlist from '@components/wrapper/WBlist.vue';
import WBlistItem from '@components/wrapper/WBlistItem.vue';

const componentArray = [
  WBtopAppBar,
  WBimgBackground,
  WBimgBackgroundContent,
  WBlayoutGrid,
  WBlayoutGridCell,
  WBbutton,
  WBbuttonFAB,
  WBbuttonIcon,
  WBchipContainer,
  WBchip,
  WBcard,
  WBdataTable,
  WBdataTableRow,
  WBdataTableColumn,
  WBmodal,
  WBcheckbox,
  WBradioButton,
  WBtextfield,
  WBtextarea,
  WBselect,
  WBlist,
  WBlistItem
]

export class ComponentRegister {
  public name: string;
  public value: any;

  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }
}

function getCompName(comp: any): ComponentRegister {
  const nameArray = comp.__file.split('/');
  const name = nameArray[nameArray.length - 1].split('.')[0];

  return new ComponentRegister(name, comp);
}

export class ComponentsLoader {

  private itemsComp: ComponentRegister[];

  constructor() {
    this.itemsComp = [];
    for (const comp of componentArray) {
      this.itemsComp.push(getCompName(comp));
    }
  }

  get items(): ComponentRegister[] {
    return this.itemsComp;
  }

}

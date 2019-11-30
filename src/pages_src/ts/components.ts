import WBtopAppBar from '_Components/wrapper/WBtopAppBar.vue';
import WBimgBackground from '_Components/wrapper/WBimgBackground.vue';
import WBimgBackgroundContent from '_Components/wrapper/WBimgBackgroundContent.vue';
import WBlayoutGrid from '_Components/wrapper/WBlayoutGrid.vue';
import WBlayoutGridCell from '_Components/wrapper/WBlayoutGridCell.vue';
import WBbutton from '_Components/wrapper/WBbutton.vue';
import WBbuttonFAB from '_Components/wrapper/WBbuttonFAB.vue';
import WBbuttonIcon from '_Components/wrapper/WBbuttonIcon.vue';
import WBchipContainer from '_Components/wrapper/WBchipContainer.vue';
import WBchip from '_Components/wrapper/WBchip.vue';
import WBcard from '_Components/wrapper/WBcard.vue';
import WBdataTable from '_Components/wrapper/WBdataTable.vue';
import WBdataTableRow from '_Components/wrapper/WBdataTableRow.vue';
import WBdataTableColumn from '_Components/wrapper/WBdataTableColumn.vue';
import WBmodal from '_Components/wrapper/WBmodal.vue';
import WBcheckbox from '_Components/wrapper/WBcheckbox.vue';
import WBradioButton from '_Components/wrapper/WBradioButton.vue';
import WBtextfield from '_Components/wrapper/WBtextfield.vue';
import WBselect from '_Components/wrapper/WBselect.vue';
import WBlist from '_Components/wrapper/WBlist.vue';
import WBlistItem from '_Components/wrapper/WBlistItem.vue';

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

  private _items: ComponentRegister[];

  constructor() {
    this._items = [];
    for (const comp of componentArray) {
      this._items.push(getCompName(comp));
    }
  }

  get items(): ComponentRegister[] {
    return this._items;
  }

}

import WBtopAppBar from '_Components/wrapper/WBtopAppBar.vue';
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

const ComponentArray = [
    WBtopAppBar,
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
    WBdataTableColumn
]

export class ComponentRegister {
    public name: string;
    public value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}

function getCompName(comp: any): ComponentRegister{
    var nameArray = comp.__file.split('/');
    var name = nameArray[nameArray.length - 1].split('.')[0];

    return new ComponentRegister(name, comp);
}

export class ComponentsLoader {

    private _items: Array<ComponentRegister>;

    constructor() {
        this._items = [];
        for (const comp of ComponentArray) {
            this._items.push(getCompName(comp));
        }
    }

    get items(): Array<ComponentRegister> {
        return this._items;
    }

}
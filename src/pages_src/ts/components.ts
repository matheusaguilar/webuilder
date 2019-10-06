import WBlayoutGrid from '_Components/wrapper/WBlayoutGrid.vue';
import WBlayoutGridCell from '_Components/wrapper/WBlayoutGridCell.vue';
import WBtopAppBar from '_Components/wrapper/WBtopAppBar.vue';

const ComponentArray = [
    WBlayoutGrid,
    WBlayoutGridCell,
    WBtopAppBar
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
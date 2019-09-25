import LayoutGrid from '_Components/designSystem/layoutGrid.vue';
import LayoutGridInner from '_Components/designSystem/layoutGridInner.vue';
import LayoutGridCell from '_Components/designSystem/layoutGridCell.vue';
import TopAppBar from '_Components/designSystem/TopAppBar.vue';

const ComponentArray = [
    LayoutGrid,
    LayoutGridInner,
    LayoutGridCell,
    TopAppBar
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
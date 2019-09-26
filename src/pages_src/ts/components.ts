import MDC_LayoutGrid from '_Components/wrapper/MDC_layoutGrid.vue';
import MDC_LayoutGridInner from '_Components/wrapper/MDC_layoutGridInner.vue';
import MDC_LayoutGridCell from '_Components/wrapper/MDC_layoutGridCell.vue';
import MDC_TopAppBar from '_Components/wrapper/MDC_topAppBar.vue';
import MDC_Drawer from '_Components/wrapper/MDC_drawer.vue';

const ComponentArray = [
    MDC_LayoutGrid,
    MDC_LayoutGridInner,
    MDC_LayoutGridCell,
    MDC_TopAppBar,
    MDC_Drawer
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
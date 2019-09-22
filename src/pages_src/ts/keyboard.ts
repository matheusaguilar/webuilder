export class KeyBoardEvents{

    private document: Document;
    private keyCodefnList: any = {}; 

    constructor(document: Document){
        this.document = document;
        this.document.body.addEventListener("keydown", (e: KeyboardEvent)  => {
            if (this.keyCodefnList[e.keyCode.toString()]){
                this.keyCodefnList[e.keyCode.toString()]();
            }
        });
    }

    delete(fn: Function){
        this.addFnToList('46', fn);
    }

    arrowLeft(fn: Function){
        this.addFnToList('37', fn);
    }

    arrowRight(fn: Function){
        this.addFnToList('39', fn);
    }

    private addFnToList(prop: string, fn: Function){
        if (!this.keyCodefnList[prop]){
            this.keyCodefnList[prop] = fn;
        }
    }

}
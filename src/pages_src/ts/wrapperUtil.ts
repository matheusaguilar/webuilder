export class WrapperUtil {

    static instance: WrapperUtil | null = null;

    /**
     * get an instance of WrapperUtil.
     */
    public static getInstance(): WrapperUtil{
        if (!this.instance){
            this.instance = new WrapperUtil();
        }
        return this.instance;
    }

    /**
     * get imported tags.
     */
    public getImportTags(elem: any){
        let tags = elem.instance.wbGetTag(elem);
        tags = tags.concat(this.getImportChildren(elem.children));
        return tags;
    }

    /**
     * get imported children tags recursive.
     */
    private getImportChildren(children: Array<any>){
        let tags: any = [];
        for(const child of children){
            tags = tags.concat(this.getImportTags(child));
        }
        return tags;
    }

    /**
     * get the html of component.
     * @param tagName the tag of component.
     * @param tagItens the props of components to pass
     * @param elem the element object.
     * @param hideInner if false hide the innerHTML of element.
     * @param slot used to select which innerHTML of wbuilder-insert will be selected.
     */
    public getTag(tagName: Array<string>, tagItens: Array<string>, elem: any, hideInner: boolean, slot: any) {
        // get all child elements with style
        const styleElements = elem.element.querySelectorAll('[style]');
        let hasStyleChild = false;
        for(var i=0; i<styleElements.length; i++){
            if (!styleElements[i].dataset.compname){
                if (this.isDescendant(elem.element, styleElements[i])){
                    hasStyleChild = true;
                    break;
                }
            }
        }
        
        let tagInit = '';
        let tagEnd = '';

        //init
        for(let i=0; i<tagName.length; i++){
            tagInit += '\n<';
            if (i == 0){
                tagInit += (!!elem.element.getAttribute("style") || hasStyleChild) && !elem.element.id ?
                    `${tagName[i]} id="${elem.element.dataset.compname}"` : tagName[i];
            } else {
                tagInit += tagName[i];
            }
            if (!!tagItens && !!tagItens[i]){
                tagInit += ' ' + tagItens[i] + '>';
            } else{
                tagInit += '>';
            }
        }

        //end
        for(let i=tagName.length - 1; i>=0; i--){
            tagEnd += '\n</' + tagName[i] + '>';
        }

        return slot == undefined ? tagInit + this.getChildrenHTML(elem, hideInner) + tagEnd
            : tagInit + this.getChildrenBySlotHTML(elem, hideInner, slot) + tagEnd;
    }

    /**
     * check if the element is child of a component
     * @param parent 
     * @param child 
     */
    private isDescendant(parent: any, child: any) {
        var node = child;
        while (node != null) {
            if (node.id){
                return false;

            } else if (node.dataset.compname) {
                if (node.dataset.compname == parent.dataset.compname) {
                    return true;
                } else {
                    return false;
                }
            }
            node = node.parentNode;
        }
        return false;
    }

    /**
     * get html of children elements.
     * @param element the element to look children.
     * @param hideInner if false remove the wbuilder-inserd div and add innerHTML of element to response. 
     */
    private getChildrenHTML(element: any, hideInner: boolean) {
        let html = '';
        if (element.children.length > 0) {
            for (const ele of element.children) {
                if (!!ele.instance.wbGetHTML) {
                    html += ele.instance.wbGetHTML(ele);
                } else {
                    console.error(`Wrapper for ${ele.comp.name} need implement wbGetHTML method.`);
                }
            }
        } else if (!hideInner) {
            const wbuilderElements = element.element.querySelectorAll('.wbuilder-insert');
            for (const wbElem of wbuilderElements) {
                wbElem.parentElement.removeChild(wbElem);
            }
            html += '\n' + element.element.innerHTML;
        }
        return html;
    }

    /**
     * get html of children elements based in slot if set.
     * @param element 
     * @param hideInner 
     * @param slot 
     */
    private getChildrenBySlotHTML(element: any, hideInner: boolean, slot: any) {
        if (element.children.length > 0) {
            let html = '';
            for (const ele of element.children) {
                if (ele.slot == slot) {
                    html += ele.instance.wbGetHTML(ele);
                }
            }
            return html;
        } else {
            return this.getChildrenHTML(element, hideInner);
        }
    }

}
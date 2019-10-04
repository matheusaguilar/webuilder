export class WrapperUtil {

    static instance: WrapperUtil | null = null;

    /**
     * get an instance of WrapperUtil
     */
    public static getInstance(): WrapperUtil{
        if (!this.instance){
            this.instance = new WrapperUtil();
        }
        return this.instance;
    }

    /**
     * get the html of component.
     * @param tagName the tag of component.
     * @param tagItens the props of components to pass
     * @param elem the element object.
     * @param hideInner if false hide the innerHTML of element.
     * @param slot used to select which innerHTML of wbuilder-insert will be selected.
     */
    public getTag(tagName: string, tagItens: string, elem: any, hideInner: boolean, slot: any) {
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
        
        // create tag name
        let tag = (!!elem.element.getAttribute("style") || hasStyleChild) && !elem.element.id ?
            `${tagName} id="${elem.element.dataset.compname}"` : tagName;

        // add tag itens
        if (tagItens) {
            tag += ' ' + tagItens;
        }

        return slot == undefined ? `\n<${tag}>${this.getChildrenHTML(elem, hideInner)}\n</${tagName}>`
            : `\n<${tag}>${this.getChildrenBySlotHTML(elem, hideInner, slot)}\n</${tagName}>`;
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
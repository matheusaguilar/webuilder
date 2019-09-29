export class WrapperUtil{

    static getChildrenHTML(element: any, hideInner: boolean){
        let html = '';
        if (element.children.length > 0){
            for(const ele of element.children){
                if (!!ele.instance.wbGetHTML){
                    html += ele.instance.wbGetHTML(ele);
                } else{
                    console.error(`Wrapper for ${ele.comp.name} need implement wbGetHTML method.`);
                }
            }
        } else if (!hideInner){
            const wbuilderElements = element.element.querySelectorAll('.wbuilder-insert');
            for(const wbElem of wbuilderElements){
                wbElem.parentElement.removeChild(wbElem);
            }
            html+= '\n' + element.element.innerHTML;
        }
        return html;
    }

    static getChildrenBySlotHTML(element: any, hideInner: boolean, slot: any){
        if (element.children.length > 0){
            let html = '';
            for(const ele of element.children){
                if (ele.slot == slot){
                    html += ele.instance.wbGetHTML(ele);
                }
            }
            return html;
        } else{
            return WrapperUtil.getChildrenHTML(element, hideInner);
        }
    }

}
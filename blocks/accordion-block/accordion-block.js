import { clearText } from "../../scripts/utils/helpers.js";

const groupContentByTag = (childNodes,tag) => {
    const principalContainer = document.createElement('div');
    let div = document.createElement('div');
    childNodes.forEach(element => {
        if(element.tagName?.toLowerCase() === tag) {
            principalContainer.append(div);
            div = document.createElement('div');
        } else {
            div.append(element);
        }
    });
    return principalContainer;
}

export default function decorate(block) {
    try {
        const items = block.querySelectorAll(':scope > div');
        const accordionItems = {};
        items.forEach(element => {
            const childs = element.querySelectorAll(':scope > div');
            const titleContainer = childs[0].querySelector('p').innerHTML;
            const className = clearText(titleContainer).replaceAll(' ', '-');            
            const contentContainer = childs[1]
            contentContainer.classList.add(className);
            if(className === 'otras-formas-de-compra') {
                const newAgrupedContent = groupContentByTag(Array.from(contentContainer.childNodes), 'hr');
                contentContainer.replaceWith(newAgrupedContent);
            }
            console.log('titleContainer', className, contentContainer);
        });
        console.log('accordionItems', accordionItems);
        block.innerHTML = '';
    } catch (error) {
        throw new Error(error);
    }
}

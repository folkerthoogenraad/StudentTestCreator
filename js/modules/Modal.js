export class Modal{
    /**
     * 
     * @param {HTMLElement} element 
     * @param {HTMLElement} background 
     */
    constructor(element, background){
        this.element = element;
        this.background = background;
    }

    close(){
        this.onclose();
        
        document.body.removeChild(this.element); 
        document.body.removeChild(this.background);
    }

    onclose(){}
}

export class ModalOptions{
    /**
     * @param {boolean} closeable 
     * @param {boolean} animate 
     */
    constructor(closeable, animate){
        this.closeable = closeable;
        this.animate = animate;
    }
}


/**
 * 
 * @param {string} content 
 * @param {ModalOptions} options 
 * @returns {Modal}
 */
export function openModal(content, options){
    if(options == undefined) options = new ModalOptions(true, false);

    var background = document.createElement("div");
    background.classList.add("modal_background");
    
    var element = document.createElement("div");
    element.classList.add("modal");

    element.innerHTML = content;
    
    // Making it fancy.
    if(options.animate){
        element.style.animation = "modalFadeIn 0.5s ease";
        background.style.animation = "backgroundFadeIn 0.5s ease";
    }

    if(options.closeable){
        background.addEventListener('click', () => {
            modal.close();
         });
    }

    var modal = new Modal(element, background);

    document.body.appendChild(background);
    document.body.appendChild(element);

    return modal;
}
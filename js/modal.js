
function openModal(content, closeable){
    if(closeable == undefined){
        closeable = true;
    }

    var background = document.createElement("div");
    background.classList.add("modal_background");
    
    var modal = document.createElement("div");
    modal.classList.add("modal");
    
    // Making it fancy.
    //modal.style.animation = "modalFadeIn 0.5s ease";
    //background.style.animation = "backgroundFadeIn 0.5s ease";

    var modalReturn = {
        element: modal,
        background: background,

        close : function(){
            document.body.removeChild(this.element); 
            document.body.removeChild(this.background);
        }
    };

    if(closeable){
        background.addEventListener('click', () => {
            modalReturn.close();
         });
    }

    document.body.appendChild(background);
    document.body.appendChild(modal);

    return modalReturn;
}
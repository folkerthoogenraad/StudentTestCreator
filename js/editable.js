
window.addEventListener('load', () => { 
    var elements = document.getElementsByClassName("editable");

    for(var i = 0; i < elements.length; i++){
        elements[i].contentEditable = true;
    }
});
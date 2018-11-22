var menuOpen = false;

const elementId = "menu";
const buttonId = "menu_button";

window.addEventListener('resize', () => setMenu(false));
window.addEventListener('click', () => setMenu(false));

window.addEventListener('load', () => { 
    document.getElementById(elementId).addEventListener('click', (event) => {event.stopPropagation();}); 
    document.getElementById(buttonId).addEventListener('click', (event) => {toggleMenu(); event.stopPropagation();}); 
});

function toggleMenu(){
    setMenu(!menuOpen);
}

function setMenu(menu){
    var d = document.getElementById(elementId);
    
    menuOpen = menu;
    d.style.transition = "opacity 0.2s linear";

    if(menuOpen){
        d.style.opacity = "1";
    }else{
        d.style.opacity = "0";
    }

}


window.addEventListener("hashchange",() => {
    setMenu(false);
}, false);
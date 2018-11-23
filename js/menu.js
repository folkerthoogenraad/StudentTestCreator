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
    d.style.transformOrigin = "100% 0%";
    d.style.transition = "transform 0.3s ease";

    if(menuOpen){
        d.style.transform = "scale(1, 1)";
    }else{
        d.style.transform = "scale(0, 0)";
    }

}


window.addEventListener("hashchange",() => {
    setMenu(false);
}, false);
export class MenuController{

    /**
     * Creates a new controller for the menu
     * @param {string} menuId 
     * @param {string} buttonId 
     */
    constructor(menuId, buttonId){
        this.menuOpen = false;
        this.menuElement = document.getElementById(menuId);
        this.buttonElement = document.getElementById(buttonId);

        
        window.addEventListener('resize', () => this.setMenu(false));
        window.addEventListener('click', () => this.setMenu(false));
        window.addEventListener("hashchange",() => this.setMenu(false), false);
        
        this.menuElement.addEventListener('click', (event) => {this.toggleMenu(); event.stopPropagation();}); 
        this.buttonElement.addEventListener('click', (event) => {this.toggleMenu(); event.stopPropagation();}); 
    }

    toggleMenu(){
        this.setMenu(!this.menuOpen);
    }

    setMenu(open){
        this.menuOpen = open;

        this.menuElement.style.transition = "transform 0.3s ease";
    
        if(this.menuOpen){
            this.menuElement.style.transform = "scale(1, 1)";
        }else{
            this.menuElement.style.transform = "scale(0, 0)";
        }    
    }
}
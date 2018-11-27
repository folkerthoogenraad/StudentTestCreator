import * as Model from './model.js';
import {createElementFromFile} from './modules/async.js';

class TestListController{

    /**
     * Creates a new controller with root element
     * @param {HTMLElement} rootElement 
     * @param {Model.Test} test
     */
    constructor(rootElement, test){
        this.rootElement = rootElement;
        this.templateElement = null;
        this.test = test;

        createElementFromFile("templates/question.html", element => {
            this.templateElement = element;
            this.listControllerUpdate();
        });
    }

    /**
     * 
     * @param {HTMLElement?} element 
     * @param {string} text 
     */
    setElementString(element, text){
        if(element != null)
            element.innerHTML = text;
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Model.Content} content 
     */
    setElementContent(element, content){
        // Setting the right things
        this.setElementString(element.querySelector('#question_body'), content.text);
        this.setElementString(element.querySelector('#question_type'), content.type);

        if(content.type == Model.TypeQuestion){
            this.setElementString(element.querySelector('#question_options'), content.points + "pnt");
        }else{
            this.setElementString(element.querySelector('#question_options'), "-");
        }
        
    }

    listControllerUpdate(){
        var elements = Array.from(this.rootElement.querySelectorAll("#question"));

        // Create new when needed.
        if(this.templateElement != null){
            while(elements.length < this.test.contents.length){
                var newNode = this.templateElement.cloneNode(true);
                elements.push(newNode);
                this.rootElement.appendChild(newNode);
            }
        }

        var contentIndex = 0;

        elements.forEach(element => {
            // Remove access when needed.
            if(contentIndex > this.test.contents.length){
                this.rootElement.removeChild(element);
                return;
            }

            this.setElementContent(element, this.test.contents[contentIndex++]);
        });
    }
}

window.addEventListener('load', function(){
    var test = new Model.Test();

    var testController = new TestListController(document.getElementById('content'), test);
    test.addOnChange(()=>{
        console.dir(test);
        testController.listControllerUpdate(test);
    });

    test.addContent(new Model.Content("Je moeder aan de poeder", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This isn't content.", Model.TypeQuestion));
    test.addContent(new Model.Content("Some information about the test is found here.", Model.TypeInfo));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
    test.addContent(new Model.Content("This is actual content", Model.TypeQuestion));
});
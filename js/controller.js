import * as Model from './modules/TestModel.js';
import {createElementFromFile} from './modules/Async.js';
import {generateAll} from './modules/TestPrint.js';
import {MenuController} from './modules/MenuController.js';
import {QuestionView} from './modules/QuestionView.js';

class ContentListView{

    /**
     * Creates a new controller with root element
     * @param {HTMLElement} rootElement 
     * @param {Model.Test} test
     */
    constructor(rootElement, test){
        this.rootElement = rootElement;

        this.templateElement = null;
        this.test = test;

        createElementFromFile("templates/list_item.html", el => this.setElement(el));
    }

    /**
     * 
     * @param {HTMLElement} info 
     */
    setElement(template){
        this.templateElement = template;
        this.listControllerUpdate();
    }

    /**
     * Why is this a member function?
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
        this.setElementString(element.querySelector('#body'), content.text);
        this.setElementString(element.querySelector('#icon'), content.text);

        if(content instanceof Model.Question){
            this.setElementString(element.querySelector('#icon'), "help_outline");
        }else{
            this.setElementString(element.querySelector('#icon'), "info_outline");
        }
        
    }

    listControllerUpdate(){
        var elements = Array.from(this.rootElement.querySelectorAll("#question"));

        // Create new when needed.
        if(this.templateElement != null){
            while(elements.length < this.test.content.length){
                var newNode = this.templateElement.cloneNode(true);
                elements.push(newNode);
                this.rootElement.appendChild(newNode);
            }
        }

        var contentIndex = 0;

        elements.forEach(element => {
            // Remove access when needed.
            if(contentIndex > this.test.content.length){
                this.rootElement.removeChild(element);
                return;
            }

            this.setElementContent(element, this.test.content[contentIndex++]);
        });
    }
}

export class MainController{

    /**
     * @param {Model.Test} test 
     */
    constructor(test){
        if(test === undefined)
            test = new Model.Test();

        this.views = [];
        this.test = test;
    }

    createTest(){
        this.test = new Model.Test();
        this.updateView();
    }

    /**
     * @returns {Model.Question} The index of the newly created info in the test.content list
     */
    createQuestion(){
        var q = new Model.Question();
        this.test.addContent(q);
        this.updateView();

        new QuestionView(this, q);

        return q;
    }

    /**
     * 
     * @param {string} info 
     * @returns {Model.Info} The index of the newly created info in the test.content list
     */
    createInfo(info){
        var i = new Model.Info(info);
        this.test.addContent(i);
        this.updateView();


        return i;
    }

    export(){
        var w = window.open();

        loadFile("print.html", (err, element) =>{
            w.document.write(element);
            w.document.write(generateAll(this.test));
            w.document.close();
        });
    }


    addView(callback){
        this.views.push(callback);
    }
    removeView(callback){
        this.views.splice(this.views.find(callback), 1);
    }

    updateView(){
        // TODO
        this.views.forEach(element => {
            element();
        });
    }
}

function setHandler(id, callback){
    var button = document.getElementById(id);
    if(button != null){
        button.addEventListener('click', callback);
    }
}

window.addEventListener('load', function(){
    var crl = new MainController();

    new MenuController("main_menu", "menu_button");
    new MenuController("add_menu", "add_button");
    
    setHandler("export", ()=>crl.export());

    setHandler("new_info", () => crl.createInfo());
    setHandler("new_question", () => {
        crl.createQuestion();
    });

    var listView = new ContentListView(document.getElementById('content'), crl.test);

    crl.test.addContent(new Model.Question("Je moeder aan de poeder"));
    crl.test.addContent(new Model.Question("This is actual content"));
    crl.test.addContent(new Model.Info("Some information about the test is found here."));

    crl.addView(() => listView.listControllerUpdate());
    listView.listControllerUpdate();
});
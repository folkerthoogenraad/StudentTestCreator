import * as Model from './modules/testModel.js';
import {createElementFromFile} from './modules/async.js';
import {generateAll} from './modules/testPrint.js';
import {MenuController} from './modules/MenuController.js';

class TestListController{

    /**
     * Creates a new controller with root element
     * @param {HTMLElement} rootElement 
     * @param {Model.Test} test
     */
    constructor(rootElement, test){
        this.rootElement = rootElement;

        this.infoTemplate = null;
        this.questionTemplate = null;
        
        this.test = test;

        createElementFromFile("templates/question.html", el => this.setQuestionElement(el));
        createElementFromFile("templates/info.html", el => this.setInfoElement(el));
    }

    
    setInfoElement(info){
        this.infoTemplate = info;
        this.listControllerUpdate();
    }

    setQuestionElement(question){
        this.questionTemplate = question;
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
        this.setElementString(element.querySelector('#question_body'), content.text);
        this.setElementString(element.querySelector('#question_type'), content.type);

        if(content instanceof Model.Question){
            this.setElementString(element.querySelector('#question_options'), content.points + "pnt");
        }else{
            this.setElementString(element.querySelector('#question_options'), "-");
        }
        
    }

    listControllerUpdate(){
        var elements = Array.from(this.rootElement.querySelectorAll("#question"));

        // Create new when needed.
        if(this.questionTemplate != null){
            while(elements.length < this.test.content.length){
                var newNode = this.questionTemplate.cloneNode(true);
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

class MainController{

    /**
     * @param {Model.Test} test 
     */
    constructor(test){
        if(test === undefined)
            test = new Model.Test();

        this.test = test;
    }

    createTest(){
        this.test = new Model.Test();
        this.updateView();
    }

    /**
     * @returns {int} The index of the newly created info in the test.content list
     */
    createQuestion(){
        var q = new Model.Question();
        this.test.addContent(q);
        this.updateView();

        return this.test.content.length - 1;
    }

    /**
     * 
     * @param {string} info 
     * @returns {int} The index of the newly created info in the test.content list
     */
    createInfo(info){
        var i = new Model.Info(info);
        this.test.addContent(i);
        this.updateView();


        return this.test.content.length - 1;
    }

    updateView(){
        // TODO
        listView.listControllerUpdate();
    }
}

function setHandler(id, callback){
    var button = document.getElementById(id);
    if(button != null){
        button.addEventListener('click', callback);
    }
}

var listView;

window.addEventListener('load', function(){
    var crl = new MainController();

    new MenuController("main_menu", "menu_button");
    new MenuController("add_menu", "add_button");
    
    setHandler("export", ()=>{
        var w = window.open();

        loadFile("print.html", function(err, element){
            w.document.write(element);
            w.document.write(generateAll(crl.test));
            w.document.close();
        });
    });

    setHandler("new_info", () => crl.createInfo());
    setHandler("new_question", () => crl.createQuestion());

    listView = new TestListController(document.getElementById('content'), crl.test);

    crl.test.addContent(new Model.Question("Je moeder aan de poeder"));
    crl.test.addContent(new Model.Question("This is actual content"));
    crl.test.addContent(new Model.Info("Some information about the test is found here."));

    listView.listControllerUpdate();
});
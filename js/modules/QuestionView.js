import {MainController} from '../controller.js';
import {Modal, openModal} from './Modal.js';
import {Question} from './TestModel.js';
import {loadFile} from './Async.js';

function setHandler(button, callback){
    if(button != null){
        button.addEventListener('click', callback);
    }
}

export class QuestionView{
    
    /**
     * @param {MainController} controller 
     * @param {Question} question
     */
    constructor(controller, question){
        this.controller = controller;
        this.question = question;
        this.modal = null;

        loadFile("templates/modal/edit_question.html", (err, text)=>{
            this.modal = openModal(text);
            this.init();
        });

    }

    init(){
        var el = this.modal.element;

        setHandler(el.querySelector("#button_save"), ()=>{this.save(); this.close();});
        setHandler(el.querySelector("#button_cancel"), ()=>{this.close();});
    }

    save() {
        var el = this.modal.element;
        this.question.text = el.querySelector("#question").value;
        this.question.answer = el.querySelector("#answer").value;
        this.question.points = el.querySelector("#points").value;
    }

    close() {
        this.modal.close();
        this.controller.updateView();
    }
}
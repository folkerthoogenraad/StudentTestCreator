export const TypeQuestion = "Question";
export const TypeInfo = "Info";

export class Content{
    /**
     * @param {string} text 
     * @param {string} type 
     * @param {string?} subject
     */
    constructor(text, type, subject){
        this.text = text;
        this.type = type;
        this.points = 0;
        this.subject = subject;
        this.test = null;
    }

    getContentId(){
        return this.contentId;
    }

    /**
     * @param {Test} test 
     */
    setTest(test){
        this.test = test;
    }

    update(){
        if(this.test != null){
            this.test.changed();
        }
    }
}

export class Test{

    /**
     * @param {Content[]} content 
     */
    constructor(contents){
        if(contents == undefined) contents = [];
        this.contents = contents;
        this.handlers = [];
    }

    /**
     * Adds content to this test
     * @param {Content} content 
     */
    addContent(content){
        content.test = this;
        this.contents.push(content);
    }

    /**
     * This callback is displayed as part of the Requester class.
     * @callback testCallback
     * @param {Test} test
     */

    /**
     * @param {testCallback} callback 
     */
    addOnChange(callback){
        this.handlers.push(callback);
    }

    changed(){
        this.handlers.forEach(element => {
            element(this);
        });
    }
}
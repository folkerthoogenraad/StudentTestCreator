export const Level = Object.freeze({
    knowledge: "knowledge",
    application :"application",
    insight:"insight"
});


export class Content{
    constructor(){
        this.type = "unknown";
    }
}

export class Question extends Content{

    /**
     * Creates a new question
     * @param {string} text 
     */
    constructor(text){
        super();
        this.type = "question";
        this.text = text === undefined ? "Question" : text;
        this.answer = ["Answer"];
        this.goal = 0;
        this.points = 1;
        this.level = Level.knowledge;
    }
}

export class Info extends Content{
    
    /**
     * Creates new information
     * @param {string} text 
     */
    constructor(text){
        super();
        this.type = "info";
        this.text = text === undefined ? "Information" : text;
    }
}

export class Goal{
    constructor(){
        this.id = "id";
        this.text = "Test goal text.";
    }
}

export class Test{

    /**
     * @param {string} title
     * @param {Goal[]} goals
     * @param {Content[]} contents
     */
    constructor(title, contents, goals){
        if(contents == undefined) contents = [];
        if(goals == undefined) goals = [];
        if(title === undefined) title = "Title";

        this.title = title;
        this.info = "Test information for students at the top of the test. Use this place to tell about calculators and other stuff.";
        this.answerInfo = "Information about the answer sheet of the test. Use this to inform teachers about how to grade the test";
        this.goals = goals;
        this.content = contents;
        
    }

    /**
     * Adds content to this test
     * @param {Content} content 
     */
    addContent(content){
        this.content.push(content);
    }
}
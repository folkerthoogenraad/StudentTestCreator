function b(classes, content){
    return element("b", classes, content);
}
function p(classes, content){
    return element("p", classes, content);
}
function h1(classes, content){
    return element("h1", classes, content);
}
function div(classes, content){
    return element("div", classes, content);
}
function table(classes, content){
    return element("table", classes, content);
}
function tr(classes, content){
    return element("tr", classes, content);
}
function td(classes, content){
    return element("td", classes, content);
}
function th(classes, content){
    return element("th", classes, content);
}
function span(classes, content){
    return element("span", classes, content);
}
function element(el, classes, content){
    return "<" + el + " class=\"" + classes + "\"" + ">" + content + "</" + el + ">";
}

function generateQuestion(question, index){
    return div("question",
        div("col1", question.points + "pnt") + 
        div("col11", 
            b("", "Vraag " + index + ". ") + 
            question.text
        )
    );
}

function generateQuestionAnswer(question, index){

    var ans = question.answer;

    if(Array.isArray(question.answer)){
        ans = "<br />";
        for(var i = 0; i < question.answer.length; i++){
            ans += question.answer[i];
            if(i != question.answer.length - 1){
                ans += ", <br />";
            }else{
                ans += ".";
            }
        }
    }

    return div("question",
        div("col1", question.points + "pnt") + 
        div("col11", 
            b("", "Vraag " + index + ". ") + 
            ans
        )
    );
}

function generateInfo(info){
    return div("info", 
        p("", info.text)
    );
}

function generateTestMatrixRowHead(test){
    return tr("",
        th("", "Doel") + 
        th("", "Kennis") + 
        th("", "Toepassing") + 
        th("", "Inzicht") + 
        th("", "Hoeveelheid") + 
        th("", "Weging")
    );
}
function generateTestMatrixRowRaw(text, knowledge, application, insight, count, weight){
    return tr("",
        td("", text) + 
        td("", knowledge) + 
        td("", application) + 
        td("", insight) + 
        td("", count) + 
        td("", Math.round(weight * 100) + "%")
    );
}

function generateTestMatrixRow(test, goal){
    var kSum = 0;
    var kCount = 0;
    var aSum = 0;
    var aCount = 0;
    var iSum = 0;
    var iCount = 0;

    var total = getTotalPoints(test);

    test.content.forEach(element => {
        if(element.goal == goal.id){
            if(element.level === "insight"){
                iSum += element.points;
                iCount++;
            }
            else if(element.level === "application"){
                aSum += element.points;
                aCount++;
            }
            else{
                kSum += element.points;
                kCount++;
            }
        }
    });

    return generateTestMatrixRowRaw(
        goal.text, 
        kSum  + span("minor", "(" + kCount + ")"),
        aSum  + span("minor", "(" + aCount + ")"),
        iSum  + span("minor", "(" + iCount + ")"), 
        kCount + aCount + iCount, 
        (kSum + aSum + iSum) / total);
}

// Helper functions
function getTotalPoints(test, func){
    var sum = 0;
    if(func == undefined)
        func = el => true;

    test.content.forEach(element => {
        if(element.type === "question" && func(element)){
            sum += element.points;
        }
    });

    return sum;
}
function getQuestionCount(test, func){
    var sum = 0;

    if(func == undefined)
        func = el => true;

    test.content.forEach(element => {
        if(element.type === "question" && func(element)){
            sum ++;
        }
    });

    return sum;
}

// Full generation
export function generateTest(test){
    var str = "";

    str += h1("", test.title);
    str += div("intro", 
        p("", test.info) + 
        p("", "Totale punten: " + getTotalPoints(test))
    );

    var index = 0;

    test.content.forEach(element => {
        if(element.type === "question"){
            index++;
            str += generateQuestion(element, index);
        }
        else if(element.type === "info"){
            str += generateInfo(element);
        }
    });

    return str;
}

export function generateAnswerSheet(test){
    var str = "";

    str += h1("", test.title + " - Antwoorden");
    str += div("intro",
        p("", test.answerInfo) + 
        p("", "Totale punten: " + getTotalPoints(test))
    );

    var index = 0;

    test.content.forEach(element => {
        if(element.type === "question"){
            index++;
            str += generateQuestionAnswer(element, index);
        }
    });

    return str;
}

export function generateTestMatrix(test){

    var str = "";

    var totalPoints = getTotalPoints(test);
    var pointsForPass = (5.5 - 1) * totalPoints / 9;
    var markForPass = (Math.ceil(pointsForPass) / totalPoints) * 9 + 1

    str += h1("", test.title + " - Toetsmatrijs");
    str += div("intro",
        p("", "Cijfer = (punten / " + getTotalPoints(test) + ") * 9 + 1" + 
            span("minor", " (" + 
                (Math.ceil(pointsForPass) + " punten voor een voldoende (" + (Math.round(markForPass * 10) / 10) + ")")
                + ")"
            )
        )
    );

    {
        var tableString = "";

        test.goals.forEach(element => {
            tableString += generateTestMatrixRow(test, element)
        });
        str += div("info", table("fullwidth", 
            generateTestMatrixRowHead() + 
            tableString + 
            generateTestMatrixRowRaw("Totaal", 
            getTotalPoints(test, el => el.level === "knowledge"),
            getTotalPoints(test, el => el.level === "application"), 
            getTotalPoints(test, el => el.level === "insight"), 
            getQuestionCount(test), 
            1)
        ));
    }

    str += div("info", "In de onderstaande tabel is de weging per toetsniveau te zien.");

    {
        var tableString = "";

        tableString += tr("", 
            th("", "") + 
            th("", "Punten") +
            th("", "Weging")
        );

        var kSum = getTotalPoints(test, el => el.level === "knowledge");
        var aSum = getTotalPoints(test, el => el.level === "application"); 
        var iSum = getTotalPoints(test, el => el.level === "insight");
        var sum = getTotalPoints(test);

        tableString += tr("", 
            td("", "Kennis") + 
            td("", kSum) + 
            td("", Math.round(kSum / sum * 100) + "%")
        );

        tableString += tr("", 
            td("", "Toepassing") +
            td("", aSum) + 
            td("", Math.round(aSum / sum * 100) + "%")
        );

        tableString += tr("", 
            td("", "Inzicht") + 
            td("", iSum) + 
            td("", Math.round(iSum / sum * 100) + "%")
        );

        tableString += tr("", 
            td("", "Total") + 
            td("", sum) + 
            td("", "100%")
        );

        str += div("info", table("", tableString));
    }

    return str;
}

export function generateAll(test){

    var fullHTML = "";
    fullHTML +=  generateTest(test);
    fullHTML += div("page_break", "");
    fullHTML +=  generateAnswerSheet(test);
    fullHTML += div("page_break", "");
    fullHTML +=  generateTestMatrix(test);

    return fullHTML;
}
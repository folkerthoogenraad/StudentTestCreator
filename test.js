var v = {
    "title" : "SQL Toets",
    "info" : "Toets 'SQL'. Enigma hoofdstuk 7, 5 Havo. Bij deze toets zijn geen hulpmiddelen toegestaan. Je hebt 50 minuten voor de toets. Motiveer je antwoorden. ",
    "answerInfo" : "Kies bij het nakijken een van de antwoorden. Komt er geen antwoord overeen is dit nul punten. ",
    "goals" : [
        {
            "id" : "g1",
            "text" : "Leerling kan beschrijven wat een database is en wat tabellen zijn"
        },
        {
            "id" : "g2",
            "text" : "De leerling kan uitleggen wat SQL is"
        },

        {
            "id" : "g3",
            "text" : "De leerling kan eenvoudige queries maken met SELECT, FROM en WHERE"
        },
        {
            "id" : "g4",
            "text" : "Leerling kan queries maken met DISTINCT"
        },
        {
            "id" : "g5",
            "text" : "Leerling kan SQL queries maken met meerdere tabellen"
        },
        {
            "id" : "g6",
            "text" : "Leerling kan gebruik maken van functies in SQL queries"
        },
    ],
    "questions" : [
        {
            "type" : "question",
            "text" : "Beschrijf wat een tabel is in een database.",
            "answer" : [
                "(1) Gegevens in kolommen",
                "(1) Een datatype",
                "(1) Een entiteit"
            ],
            "goal" : "g1",
            "level" : "knowledge",
            "points" : 1
        },
        {
            "type" : "question",
            "text" : "Beschrijf wat een record is in een database.",
            "answer" : [
                "(1) Een rij in een tabel",
                "(1) Informatie in een tabel"
            ],
            "goal" : "g1",
            "level" : "knowledge",
            "points" : 1
        },
        {
            "type" : "question",
            "text" : "Beschrijf wat SQL is",
            "answer" : "Een (database) vraagtaal",
            "answer" : [
                "(2) Database vraagtaal",
                "(1) Structured Query Language",
                "(1) Vraagtaal"
            ],
            "goal" : "g2",
            "level" : "knowledge",
            "points" : 2
        },

        {
            "type" : "info",
            "text" : "De school database bestaat uit 4 tabellen: leerlingen, cijfers, toetsen en vakken. Elke toets heeft een toetsnummer. Als een leerling een toets heeft gemaakt staat er een rij in de cijfers tabel met het bijbehorende leerlingnummer en toetsnummer. Elke toets hoort bij een vak. In het onderstaande strokendiagram wordt de structuur van de database weergegeven.<br><img width=\"400\" src=\"img/database.png\"></img>"
        },
        {
            "type" : "info",
            "text" : "Schrijf de antwoorden op de onderstaande vragen als SQL queries. Gebruik hiervoor de school database"
        },

        {
            "type" : "question",
            "text" : "Geef de voor- en achternamen van alle leerlingen die in Doetinchem wonen, gesorteerd op achternaam",
            "answer" : [
                "(2) <code>SELECT voornaam, naam FROM leerlingen WHERE woonplaats = \"Doetinchem\" ORDER BY achternaam</code>",
                "(1) <code>SELECT voornaam, naam FROM leerlingen WHERE woonplaats = \"Doetinchem\"",
            ],
            "goal" : "g3",
            "level" : "application",
            "points" : 2
        },
        {
            "type" : "question",
            "text" : "Geef alle unieke woonplaatsen",
            "answer" : [
                "(1)<code>SELECT DISTINCT woonplaats FROM leerlingen</code>",
            ],
            "goal" : "g4",
            "level" : "application",
            "points" : 1
        },

        {
            "type" : "question",
            "text" : "Geef de leerlingnummers van alle leerlingen die geen herkansing hebben gemaakt voor de \"Atmosfeer\" toets",
            
            "answer" : [
                "(2) <code>SELECT leerlingnr FROM toetsen, cijfers WHERE toetsen.toetsnr = cijfers.toetsnr AND toetsnaam = \"Atmosfeer\" AND herkansing IS NULL</code>",
                "(1) <code>SELECT leerlingnr FROM toetsen, cijfers WHERE toetsnaam = \"Atmosfeer\" AND herkansing IS NULL</code>",
                "(1) <code>SELECT leerlingnr FROM toetsen, cijfers WHERE toetsen.toetsnr = cijfers.toetsnr AND toetsnaam = \"Atmosfeer\"</code>",
            ],
            "goal" : "g5",
            "level" : "application",
            "points" : 2
        },
        {
            "type" : "question",
            "text" : "Geef de voor- en achternaam van alle leerlingen die ooit een herkansing hebben gemaakt",
            "answer" : [
                "(2) <code>SELECT DISTINCT naam, achternaam FROM leerlingen, cijfers WHERE leerlingen.leerlingnr = cijfers.leerlingnr AND NOT herkansing IS NULL</code>",
                "(1) <code>SELECT naam, achternaam FROM leerlingen, cijfers WHERE leerlingen.leerlingnr = cijfers.leerlingnr AND NOT herkansing IS NULL</code>",
            ],
            "goal" : "g5",
            "level" : "application",
            "points" : 2
        },

        {
            "type" : "question",
            "text" : "Geef het gemiddelde cijfer van alle toetsen (zonder herkansingen)",
            "answer" : [
                "(1) <code>SELECT AVG(cijfer) FROM cijfers</code>",
            ],
            "goal" : "g6",
            "level" : "application",
            "points" : 1
        },
        {
            "type" : "question",
            "text" : "Geef het laagste cijfer per toets (zonder herkansingen)",
            "answer" : [
                "(2) <code>SELECT MIN(cijfer), toetsnr FROM cijfers GROUP BY toetsnr</code>",
                "(2) <code>SELECT MIN(cijfer) FROM cijfers GROUP BY toetsnr</code>",
                "(1) <code>SELECT MIN(cijfer) FROM cijfers</code>",
            ],
            "goal" : "g6",
            "level" : "application",
            "points" : 2
        }
    ]
};

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

    test.questions.forEach(element => {
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

    test.questions.forEach(element => {
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

    test.questions.forEach(element => {
        if(element.type === "question" && func(element)){
            sum ++;
        }
    });

    return sum;
}

// Full generation
function generateTest(test){
    var str = "";

    str += h1("", test.title);
    str += div("intro", 
        p("", test.info) + 
        p("", "Totale punten: " + getTotalPoints(test))
    );

    var index = 0;

    test.questions.forEach(element => {
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

function generateAnswerSheet(test){
    var str = "";

    str += h1("", test.title + " - Antwoorden");
    str += div("intro",
        p("", test.answerInfo) + 
        p("", "Totale punten: " + getTotalPoints(test))
    );

    var index = 0;

    test.questions.forEach(element => {
        if(element.type === "question"){
            index++;
            str += generateQuestionAnswer(element, index);
        }
    });

    return str;
}

function generateTestMatrix(test){

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


window.onload = function(){
    var fullHTML = "";
    fullHTML +=  generateTest(v);
    fullHTML += div("page_break", "");
    fullHTML +=  generateAnswerSheet(v);
    fullHTML += div("page_break", "");
    fullHTML +=  generateTestMatrix(v);

    //document.body.innerHTML = generateTest(v);
    //document.body.innerHTML = generateAnswerSheet(v);
    //document.body.innerHTML = generateTestMatrix(v);
    document.body.innerHTML = fullHTML;
}
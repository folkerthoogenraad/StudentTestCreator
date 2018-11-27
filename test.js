var v = {
    "title" : "SQL Toets",
    "info" : "Bij deze toets zijn geen hulpmiddelen toegestaan. Je hebt 50 minuten voor de toets. Motiveer je antwoorden. ",
    "questions" : [
        {
            "type" : "question",
            "text" : "Beschrijf wat een tabel is in een database.",
            "points" : 1
        },
        {
            "type" : "question",
            "text" : "Beschrijf wat een record is in een database.",
            "points" : 1
        },
        {
            "type" : "question",
            "text" : "Beschrijf wat SQL is",
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
            "points" : 2
        },
        {
            "type" : "question",
            "text" : "Geef alle unieke woonplaatsen",
            "points" : 1
        },

        {
            "type" : "question",
            "text" : "Geef de leerlingnummers van alle leerlingen die geen herkansing hebben gemaakt voor de \"Atmosfeer\" toets",
            "points" : 2
        },
        {
            "type" : "question",
            "text" : "Geef de voor- en achternaam van alle leerlingen die ooit een herkansing hebben gemaakt",
            "points" : 2
        },

        {
            "type" : "question",
            "text" : "Geef het gemiddelde cijfer van alle toetsen (zonder herkansingen)",
            "points" : 2
        },
        {
            "type" : "question",
            "text" : "Geef het aantal herkansingen",
            "points" : 1
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

function generateInfo(info){
    return div("info", 
        p("", info.text)
    );
}

function getTotalPoints(test){
    var sum = 0;

    test.questions.forEach(element => {
        if(element.type === "question"){
            sum += element.points;
        }
    });

    return sum;
}

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

window.onload = function(){
    document.body.innerHTML = generateTest(v);
}
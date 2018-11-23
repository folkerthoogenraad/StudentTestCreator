function newTestModal(){
    var m = openModal("");

    setElementContent("templates/modal/new_test.html", m.element, ()=>{
        m.element.querySelector('#button_cancel').addEventListener('click', ()=>{m.close();});

        m.element.querySelector('#button_create').addEventListener('click', ()=>{m.close();});
    });
}

function newSubjectModal(){
    createElementContent("templates/subject.html", function(element){
        document.getElementById('content').appendChild(element);

        var subjectName = element.querySelector('#subject_name');
        var elementContent = element.querySelector('#subject_content');
        var elementAdd = element.querySelector('#subject_add');
        var elementRemove = element.querySelector('#subject_remove');

        var disp = elementContent.style.display;
        var open = true;

        function setOpen(op){
            open = op;

            if(!open){
                elementContent.style.display = "none";
            }else{
                elementContent.style.display = disp;
            }
        }

        subjectName.addEventListener('click', function(){
            setOpen(!open);
        });
        elementRemove.addEventListener('click', function(){
            document.getElementById('content').removeChild(element);
        });
        elementAdd.addEventListener('click', function(){
            createElementContent("templates/question.html", function(element){
                element.classList.add("question");
                elementContent.appendChild(element);
                setOpen(true);
            });
        });
    });
}

function newQuestionModal(){
    openModal("New question");
}


window.addEventListener('load', ()=>{
    var addButton = document.getElementById("add_button");
    if(addButton != null){
        addButton.addEventListener('click', ()=>{
            var w = window.open();
            loadFile("print.html", function(err, element){
                w.document.write(element);
            });
        });
    }

    var testElement = document.getElementById('new_test');
    if(testElement != null){
        testElement.addEventListener('click', ()=>{ setMenu(false); newTestModal(); });
    }
    
    var subjectElement = document.getElementById('new_subject');
    if(subjectElement != null){
        subjectElement.addEventListener('click', ()=>{ setMenu(false);newSubjectModal(); });
    }
    
    var questionElement = document.getElementById('new_question');
    if(questionElement != null){
        questionElement.addEventListener('click', ()=>{ setMenu(false); newQuestionModal(); });
    }
});
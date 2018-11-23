
/**
 * Requestcallback for loadFile
 * 
 * @callback requestCallback
 * @param {string} err
 * @param {string} responseText
 */

/**
 * 
 * @param {string} page Page to load
 * @param {requestCallback} callback 
 */
function loadFile(page, callback){
    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
        if (r.readyState != 4) return;

        var err = undefined;
        if(!(r.status == 0 || r.status == 200)){
            err = "Status not 200, status = " + r.status;
        }

        callback(err, r.responseText);
    };
    
    r.open("GET", page, true);
    r.send();
}

/**
 * Requestcallback for setElementContent
 * 
 * @callback setElementContentCallback
 */

/**
 * Set the content of an element to the specified file
 * @param {string} file 
 * @param {HTMLElement} element 
 * @param {setElementContentCallback} callback
 */
function setElementContent(file, element, callback){
    loadFile(file, function(err, text){
        if(err != undefined){
            return;
        }
        element.innerHTML = text;
        callback();
    });
}

/**
 * Requestcallback for createElementContentCallback
 * 
 * @callback createElementContentCallback
 * @param {HTMLElement} element
 */

/**
 * @param {HTMLElement} element 
 * @param {createElementContentCallback} callback
 */
function createElementContent(file, callback){
    var element = document.createElement('div');

    loadFile(file, function(err, text){
        if(err != undefined){
            return;
        }
        element.innerHTML = text;
        callback(element);
    });
}
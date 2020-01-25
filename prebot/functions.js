function initialize() {
    //initDCU(); 
    ErrorCatcher = 'true';

    ErrorCatcher = getElement('ErrorValue');
}

function refresh(json) {
   // updateDCU();

    if(ErrorCatcher.innerHTML == "undefined"){
        ErrorCatcher.innerHTML = 'ErrorCatcher has not been run yet'
    }
    if (json['ErrorCatcher'] != ErrorCatcher.innerHTML) {
        
        ErrorCatcher.innerHTML = json['ErrorCatcher'];

    }
}

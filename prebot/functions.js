function initialize() {
    //initDCU(); 
    ErrorCatcherCAN = 'true';
    ErrorCatcherCAN = getElement('ErrorValueCAN');

    ErrorCatcherEncoder = 'true';
    ErrorCatcherEncoder = getElement('ErrorValueEncoder');

    ErrorCatcherLimelight = 'true';
    ErrorCatcherLimelight = getElement('ErrorValueLimelight');
}

function refresh(json) {
   // updateDCU();


    if (json['ErrorCatcherCAN'] != ErrorCatcherCAN.innerHTML) {
        
        ErrorCatcherCAN.innerHTML = json['ErrorCatcherCAN'];

    }
    if(ErrorCatcherCAN.innerHTML == "undefined"){
        ErrorCatcherCAN.innerHTML = 'ErrorCatcher has not been run yet'
    }

    if (json['ErrorCatcherEncoder'] != ErrorCatcherEncoder.innerHTML) {
        
        ErrorCatcherEncoder.innerHTML = json['ErrorCatcherEncoder'];

    }
    if(ErrorCatcherEncoder.innerHTML == "undefined"){
        ErrorCatcherEncoder.innerHTML = 'ErrorCatcher has not been run yet'
    }

    if (json['ErrorCatcherLimelight'] != ErrorCatcherLimelight.innerHTML) {
        
        ErrorCatcherLimelight.innerHTML = json['ErrorCatcherLimelight'];

    }
    if(ErrorCatcherLimelight.innerHTML == "undefined"){
        ErrorCatcherLimelight.innerHTML = 'ErrorCatcher has not been run yet'
    }
}

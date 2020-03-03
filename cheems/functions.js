function initialize() {
    //initDCU(); 
    ErrorCatcherCAN = 'true';
    ErrorCatcherCAN = getElement('ErrorValueCAN');

    ErrorCatcherBridge = 'true';
    ErrorCatcherBridge = getElement('ErrorValueBridge');

    ErrorCatcherLimelight = 'true';
    ErrorCatcherLimelight = getElement('ErrorValueLimelight');

    ErrorCatcherMovement = 'true';
    ErrorCatcherMovement = getElement('ErrorValueMovement');
}

function refresh(json) {
   // updateDCU();


    if (json['ErrorCatcherCAN'] != ErrorCatcherCAN.innerHTML) {
        
        ErrorCatcherCAN.innerHTML = json['ErrorCatcherCAN'];

    }
    if(ErrorCatcherCAN.innerHTML == "undefined"){
        ErrorCatcherCAN.innerHTML = 'ErrorCatcher has not been run yet'
    }

    if (json['ErrorCatcherBridge'] != ErrorCatcherBridge.innerHTML) {
        
        ErrorCatcherBridge.innerHTML = json['ErrorCatcherBridge'];

    }
    if(ErrorCatcherBridge.innerHTML == "undefined"){
        ErrorCatcherBridge.innerHTML = 'Bridge is not connected or ErrorCatcher has not been runs'
    }

    if (json['ErrorCatcherLimelight'] != ErrorCatcherLimelight.innerHTML) {
        
        ErrorCatcherLimelight.innerHTML = json['ErrorCatcherLimelight'];

    }
    if(ErrorCatcherLimelight.innerHTML == "undefined"){
        ErrorCatcherLimelight.innerHTML = 'Limelight not found'
    }

    if (json['ErrorCatcherMovement'] != ErrorCatcherMovement.innerHTML) {
        
        ErrorCatcherMovement.innerHTML = json['ErrorCatcherMovement'];

    }
    if(ErrorCatcherMovement.innerHTML == "undefined"){
        ErrorCatcherMovement.innerHTML = 'Movement has not been run yet'
    }
    
}

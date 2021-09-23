var shooting_state;

function initialize() {
    //initDCU(); 

    //shooting_state = getElement('shooting_state');
    shooting_state = "Mid";
    // SetStateLong = 'true';
    // SetStateMid = 'true';
    // SetStateShort = 'true';

}

function refresh(json) {

    if (json['shooting_state'] != shooting_state){
        getElement('SetState'+shooting_state).classList.remove('green');
        getElement('SetState'+shooting_state).classList.add('grey');

        shooting_state = json['shooting_state'];

        getElement('SetState'+shooting_state).classList.remove('grey');
        getElement('SetState'+shooting_state).classList.add('green');
    }

    if(json['align_toggle'] == 'true'){
        getElement('VisionAlign').classList.remove('green');
        getElement('VisionAlign').classList.add('grey');
        getElement('ManualAlign').classList.remove('grey');
        getElement('ManualAlign').classList.add('green');
    } else {
        getElement('ManualAlign').classList.remove('green');
        getElement('ManualAlign').classList.add('grey');
        getElement('VisionAlign').classList.remove('grey');
        getElement('VisionAlign').classList.add('green'); 
    }
    /*
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
        ErrorCatcherBridge.innerHTML = 'Bridge is not connected or ErrorCatcher has not been run'
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
    */
    
}

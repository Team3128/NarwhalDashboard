function initialize() {
    //initDCU(); 

    ball_count = getElement('ball_count');
    hopper_indicator = getElement('hopper_indicator');

    shooting_state = getElement('shooting_state');
    SetStateLong = 'true';
    SetStateMid = 'true';
    SetStateShort = 'true';

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
    temp_string = "Ball Count: ";
    ball_count.innerHTML = temp_string.concat(String(json['ball_count']));

    if(json['ball_count'] == 0) {
        hopper_indicator.src = "/cheems/assets/0_ball.png";
    } else if(json['ball_count'] == 1) {
        hopper_indicator.src = "/cheems/assets/1_ball.png";
    } else if(json['ball_count'] == 2) {
        hopper_indicator.src = "/cheems/assets/2_ball.png";
    } else if(json['ball_count'] == 3) {
        hopper_indicator.src = "/cheems/assets/3_ball.png";
    } else {
        hopper_indicator.src = "/cheems/assets/error_ball.png";
    }

    if (json['SetStateLong'] != SetStateLong.innerHTML) {
        getElement(SetStateLong).classList.remove('green');
        getElement(SetStateLong).classList.add('grey');
        
        SetStateLong.innerHTML = json['SetStateLong'];

        getElement(SetStateLong).classList.remove('grey');
        getElement(SetStateLong).classList.add('green');
    }
    if (json['SetStateMid'] != SetStateMid.innerHTML) {
        getElement(SetStateMid).classList.remove('green');
        getElement(SetStateMid).classList.add('grey');
        
        SetStateMid.innerHTML = json['SetStateMid'];

        getElement(SetStateMid).classList.remove('grey');
        getElement(SetStateMid).classList.add('green');
    }
    if (json['SetStateShort'] != SetStateShort.innerHTML) {
        getElement(SetStateShort).classList.remove('green');
        getElement(SetStateShort).classList.add('grey');
        
        SetStateShort.innerHTML = json['SetStateShort'];

        getElement(SetStateShort).classList.remove('grey');
        getElement(SetStateShort).classList.add('green');
    }
    if (json['shooting_state'] != shooting_state){
        getElement('SetState'+shooting_state).classList.remove('green');
        getElement('SetState'+shooting_state).classList.add('grey');

        shooting_state = json['shooting_state'];

        getElement('SetState'+shooting_state).classList.remove('grey');
        getElement('SetState'+shooting_state).classList.add('green');
    }

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
    
}

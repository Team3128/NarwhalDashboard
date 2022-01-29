var shooting_state;

function initialize() {
    shooting_state = "Mid";
}

function refresh(json) {

    // if (json['shooting_state'] != shooting_state){
    //     getElement('SetState'+shooting_state).classList.remove('green');
    //     getElement('SetState'+shooting_state).classList.add('grey');

    //     shooting_state = json['shooting_state'];

    //     getElement('SetState'+shooting_state).classList.remove('grey');
    //     getElement('SetState'+shooting_state).classList.add('green');
    // }

    // if(json['align_toggle'] == 'true'){
    //     getElement('VisionAlign').classList.remove('green');
    //     getElement('VisionAlign').classList.add('grey');
    //     getElement('ManualAlign').classList.remove('grey');
    //     getElement('ManualAlign').classList.add('green');
    // } else {
    //     getElement('ManualAlign').classList.remove('green');
    //     getElement('ManualAlign').classList.add('grey');
    //     getElement('VisionAlign').classList.remove('grey');
    //     getElement('VisionAlign').classList.add('green'); 
    // }
}

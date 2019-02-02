function initialize() {
    left_ids = ['l_f', 'l_mp_p', 'l_mp_i', 'l_mp_d', 'l_v_p', 'l_v_i', 'l_v_d'];
    right_ids = ['r_f', 'r_mp_p', 'r_mp_i', 'r_mp_d', 'r_v_p', 'r_v_i', 'r_v_d'];
}

function refresh(json) {
    for (var i = 0; i < left_ids.length; i++) {
        element(left_ids[i]).value = json[left_ids[i]];
        element(right_ids[i]).value = json[right_ids[i]];
    }

    element('wheelCirc').innerText = Number(json['wheelCirc']).toFixed(2);

    element('leftKf').innerText = Number(json['leftKf']).toFixed(4);
    element('rightKf').innerText = Number(json['rightKf']).toFixed(4);

    element('leftSpeedScalar').innerText =  Number(json['leftSpeedScalar']).toFixed(4);
    element('rightSpeedScalar').innerText =  Number(json['rightSpeedScalar']).toFixed(4);

    element('wheelBase').innerText = json['wheelBase'];
    element('leftVelocityError').innerText = json['leftVelocityError'];
    element('rightVelocityError').innerText = json['rightVelocityError'];
}

function pushLeftPID() {
    sendNum('leftPID', getPIDConstants(left_ids));
}

function pushRightPID() {
    sendNum('rightPID', getPIDConstants(rigth_ids));
}

function getPIDConstants(field_ids) {
    var data = "";

    for (var i = 0; i < field_ids.length; i++) {
        data += element(field_ids[i]).value;

        if (i != field_ids.length - 1) {
            data += ',';
        }
    }
}
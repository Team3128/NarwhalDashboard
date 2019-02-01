function initialize() {
    left_ids = ['l_f', 'mp_l_p', 'mp_l_i', 'mp_l_d', 'v_l_p', 'v_l_i', 'v_l_d'];
    right_ids = ['r_f', 'mp_r_p', 'mp_r_i', 'mp_r_d', 'v_r_p', 'v_r_i', 'v_r_d'];
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
    sendConstants(left_ids);
}

function pushRightPID() {
    sendConstants(right_ids);
}

function sendConstants(field_ids) {
    for (var i = 0; i < field_ids.length; i++) {
        var id = field_ids[i];

        sendNum(id, element(id).value);
    }
}
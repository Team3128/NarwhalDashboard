function initialize() {
    left_ids = ['l_f', 'mp_l_p', 'mp_l_i', 'mp_l_d', 'v_l_p', 'v_l_i', 'v_l_d'];
    right_ids = ['r_f', 'mp_r_p', 'mp_r_i', 'mp_r_d', 'v_r_p', 'v_r_i', 'v_r_d'];
}

function refresh(json) {
    for (var id in left_ids) {
        getElement(id).value = json[id];
    }

    for (var id in right_ids) {
        getElement(id).value = json[id];
    }

    // Everything else calibration
    document.getElementById('wheelCirc').innerText = json['wheelCirc'];
    document.getElementById('leftKf').innerText = json['leftKf'];
    document.getElementById('rightKf').innerText = json['rightKf'];
    document.getElementById('leftSpeedScalar').innerText = json['leftSpeedScalar'];
    document.getElementById('rightSpeedScalar').innerText = json['rightSpeedScalar'];
    document.getElementById('wheelBase').innerText = json['wheelBase'];
    document.getElementById('leftVelocityError').innerText = json['leftVelocityError'];
    document.getElementById('rightVelocityError').innerText = json['rightVelocityError'];
}

function pushLeftPID() {
    sendConstants(left_ids);
}

function pushRightPID() {
    sendConstants(right_ids);
}

function sendConstants(ids) {
    for (var id in ids) {
        console.log(getElement(id).value);
        sendNum(id, getElement(id).value);
    }
}
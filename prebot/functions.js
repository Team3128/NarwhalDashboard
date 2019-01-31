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

    document.getElementById('wheelCirc').innerText = Number(json['wheelCirc']).toFixed(2);

    document.getElementById('leftKf').innerText = Number(json['leftKf']).toFixed(4);
    document.getElementById('rightKf').innerText = Number(json['rightKf']).toFixed(4);

    document.getElementById('leftSpeedScalar').innerText =  Number(json['leftSpeedScalar']).toFixed(4);
    document.getElementById('rightSpeedScalar').innerText =  Number(json['rightSpeedScalar']).toFixed(4);

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
function initialize() {

}

function refresh(json) {
    document.getElementById('wheelCirc').innerText = Number(json['wheelCirc']).toFixed(2);

    document.getElementById('leftKf').innerText = Number(json['leftKf']).toFixed(4);
    document.getElementById('rightKf').innerText = Number(json['rightKf']).toFixed(4);

    document.getElementById('leftSpeedScalar').innerText =  Number(json['leftSpeedScalar']).toFixed(4);
    document.getElementById('rightSpeedScalar').innerText =  Number(json['rightSpeedScalar']).toFixed(4);

    document.getElementById('wheelBase').innerText = json['wheelBase'];
    document.getElementById('leftVelocityError').innerText = json['leftVelocityError'];
    document.getElementById('rightVelocityError').innerText = json['rightVelocityError'];
}
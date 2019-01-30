function initialize() {

}

function refresh(json) {
    document.getElementById('wheelCirc').innerText = json['wheelCirc'];
    document.getElementById('leftKf').innerText = json['leftKf'];
    document.getElementById('rightKf').innerText = json['rightKf'];
    document.getElementById('leftSpeedScalar').innerText = json['leftSpeedScalar'];
    document.getElementById('rightSpeedScalar').innerText = json['rightSpeedScalar'];
    document.getElementById('wheelBase').innerText = json['wheelBase'];
    document.getElementById('leftVelocityError').innerText = json['leftVelocityError'];
    document.getElementById('rightVelocityError').innerText = json['rightVelocityError'];
}
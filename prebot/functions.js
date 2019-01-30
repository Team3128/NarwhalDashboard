function initialize() {

}

function refresh(json) {
    {% if page.tab == 'Drive Calibration Utility' %}
        document.getElementById('wheelCirc').innerText = json['wheelCirc'] + 'in';
        document.getElementById('leftKf').innerText = json['leftKf'];
        document.getElementById('rightKf').innerText = json['rightKf'];
        document.getElementById('leftSpeedScalar').innerText = json['leftSpeedScalar'];
        document.getElementById('rightSpeedScalar').innerText = json['rightSpeedScalar'];
        document.getElementById('wheelBase').innerText = json['wheelBase'] + 'in';
        document.getElementById('leftVelocityError').innerText = json['leftVelocityError'] + 'nu/100ms';
        document.getElementById('rightVelocityError').innerText = json['rightVelocityError'] + 'nu/100ms';
    {% endif %}
}
function initialize() {

}

function refresh(json) {
    {% if page.tab == 'Drive Calibration Utility' %}
        document.getElementById('wheelCirc').innerText = json['wheelCirc'] + 'in';
        document.getElementById('leftKf').innerText = json['leftKf'];
        document.getElementById('rightKf').innerText = json['rightKf'] + 'in';
        document.getElementById('leftSpeedScalar').innerText = json['leftSpeedScalar'] + 'in';
        document.getElementById('rightSpeedScalar').innerText = json['rightSpeedScalar'] + 'in';
        document.getElementById('wheelBase').innerText = json['wheelBase'] + 'in';
        document.getElementById('leftVelocityError').innerText = json['leftVelocityError'] + 'in';
        document.getElementById('rightVelocityError').innerText = json['rightVelocityError'] + 'in';

    {% endif %}
}
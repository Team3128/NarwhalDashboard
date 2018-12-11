var speedGauge;
var forkBar;

function initialize() {
    speedGauge = makeGauge('speed_gauge', 200, 0, 20, [0,4,8,12,16,20], 4, [
            {from:  0, to:  8, color: "#d60000"},
            {from:  8, to: 15, color: "#efdb00"},
            {from: 15, to: 20, color: "#41c603"}
        ], "black", "black", "#072682", 2, 32);
    speedGauge.value = 0;
    speedGauge.draw();

    forkBar = makeBar('fork_bar', 200, 500, 0, 8, [0,1,2,3,4,5,6,7,8], 4, "both", [
            {from: 0, to: 2, color: "#d60000"},
            {from: 2, to: 4, color: "#efdb00"},
            {from: 4, to: 5, color: "#41c603"},
            {from: 5, to: 8, color: "#0085b2"}
        ], "white", "black", "#0068a5", 2, 36);
    forkBar.value = 0;
    forkBar.draw();
}

function refresh(json) {
    speedGauge.value = json['speed'];
    speedGauge.draw();

    forkBar.value = json['height'];
    forkBar.draw();
}
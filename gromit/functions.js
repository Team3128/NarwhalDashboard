var scoring_target, game_element;
var gear;

var gear_indicator;

function initialize() {
    initDCU();

    scoring_target = 'mid';
    game_element = 'hatch_panel';

    gear = 'false';

    gear_indicator = getElement('gear_indicator');
}

function refresh(json) {
    updateDCU();

    if (json['scoring_target'] != scoring_target) {
        getElement(scoring_target + '_indicator').classList.remove('green');
        getElement(scoring_target + '_indicator').classList.add('grey');

        scoring_target = json['scoring_target'];

        getElement(scoring_target + '_indicator').classList.remove('grey');
        getElement(scoring_target + '_indicator').classList.add('green');
    }

    if (json['game_element'] != game_element) {
        getElement(game_element + '_indicator').classList.remove('green');
        getElement(game_element + '_indicator').classList.add('grey');

        game_element = json['game_element'];

        getElement(game_element + '_indicator').classList.remove('grey');
        getElement(game_element + '_indicator').classList.add('green');
    }

    if (json['gear'] != gear) {
        gear = json['gear'];

        if (gear == 'false') {
            gear_indicator.classList.remove('green');
            gear_indicator.classList.add('orange');

            gear_indicator.innerHTML = "Low<br>Gear";
        }
        else {
            gear_indicator.classList.add('green');
            gear_indicator.classList.remove('orange');

            gear_indicator.innerHTML = "High<br>Gear";
        }
    }
    
}

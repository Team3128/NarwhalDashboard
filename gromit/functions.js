var scoring_target, game_element;

function initialize() {
    initDCU();

    scoring_height = 'mid';
    game_element = 'hatch_panel';
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
    
}

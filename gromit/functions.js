var scoring_height, game_element;

function initialize() {
    initDCU();

    scoring_height = 'mid';
    game_element = 'hatch';
}

function refresh(json) {
    updateDCU();

    if (json['scoring_height'] != scoring_height) {
        getElement(scoring_height + '_indicator').classList.remove('green');
        getElement(scoring_height + '_indicator').classList.add('grey');

        scoring_height = json['scoring_height'];

        getElement(scoring_height + '_indicator').classList.remove('grey');
        getElement(scoring_height + '_indicator').classList.add('green');
    }

    if (json['game_element'] != game_element) {
        getElement(game_element + '_indicator').classList.remove('green');
        getElement(game_element + '_indicator').classList.add('grey');

        game_element = json['game_element'];

        getElement(game_element + '_indicator').classList.remove('grey');
        getElement(game_element + '_indicator').classList.add('green');
    }
    
}

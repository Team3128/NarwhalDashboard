var scoring_target, game_element;

function initialize() {
    scoring_height = 'mid';
    game_element = 'hatch_panel';

    // addTouchListener("cargo_indicator", buttonDown("setElement_cargo"));
    // addTouchListener("hatch_panel_indicator", buttonDown("setElement_hatch"));
    // addTouchListener("none_indicator", buttonDown("setElement_none"));

    // addTouchListener("top_indicator", buttonDown("setTarget_rocket_top"))
    // addTouchListener("mid_indicator", buttonDown("setTarget_rocket_mid"))
    // addTouchListener("low_indicator", buttonDown("setTarget_rocket_low"))
    // addTouchListener("ship_indicator", buttonDown("setTarget_rocket_ship"))
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

// function addTouchListener(id, lambda) {
//     document.body.addEventListener('touchstart', function(e) {
//         lambda;
//         alert("touch");
//     }, false);
// }

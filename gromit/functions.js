var scoring_target, game_element;
var gear;

var gear_indicator;

var top_ll_indic, bot_ll_indic, align_indic;
var top_ll_conn, bot_ll_conn, align_status;

function initialize() {
    initDCU();

    scoring_target = 'mid';
    game_element = 'hatch_panel';

    gear = 'false';

    gear_indicator = getElement('gear_indicator');

    top_ll_indic = getElement('top_ll_indic');
    bot_ll_indic = getElement('bot_ll_indic');
    align_indic = getElement('align_indic');

    //bottom_stream = getElement('bottom_stream');
    //top_stream = getElement('top_stream');

    top_ll_conn = 'false';
    bot_ll_conn = 'false';

    align_status = 'blind';

    stream_status = 'top';
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

    if (json['top_ll_conn'] != top_ll_conn) {
        top_ll_conn = json['top_ll_conn'];

        if (top_ll_conn != 'true') {
            top_ll_indic.classList.remove('green');
            top_ll_indic.classList.add('red');
        }
        else {
            top_ll_indic.classList.remove('red');
            top_ll_indic.classList.add('green');
        }
    }
    

    if (json['bot_ll_conn'] !=  bot_ll_conn) {
        bot_ll_conn = json['bot_ll_conn'];

        if (bot_ll_conn != 'true') {
            bot_ll_indic.classList.remove('green');
            bot_ll_indic.classList.add('red');
        }
        else {
            bot_ll_indic.classList.remove('red');
            bot_ll_indic.classList.add('green');
        }
    }

    if (json['align_status'] != align_status) {
        align_status = json['align_status'];

        if (align_status == 'blind') {
            align_indic.classList.remove('green');
            align_indic.classList.remove('orange');
            align_indic.classList.add('red');
        }
        else if(align_status == 'searching'){
            align_indic.classList.remove('red');
            align_indic.classList.remove('green');
            align_indic.classList.add('orange');
        }
        else if(align_status == 'feedback') {
            align_indic.classList.remove('red');
            align_indic.classList.remove('orange');
            align_indic.classList.add('green');
        }

        /*if(json['streamLL'] != stream_status){
            stream_status = json[streamLL];

            if (stream_status == 'top'){
                top_stream.style = "width: 100%; margin: 8px 0px 0px 0px; display: none;";
                bottom_stream.style = "width: 0%; margin: 8px 0px 0px 0px; display: none;";
            } else if(stream_status == 'bottom'){
                bottom_stream.style = "width: 100%; margin: 8px 0px 0px 0px; display: none;";
                top_stream.style = "width: 0%; margin: 8px 0px 0px 0px; display: none;";
            } else {
                top_stream.style = "width: 100%; margin: 8px 0px 0px 0px; display: none;";
                bottom_stream.style = "width: 100%; margin: 8px 0px 0px 0px; display: none;";
            }
        }*/

    }
}
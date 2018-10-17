var DISCONNECTED = 0;
var CONNECTING = 1;
var CONNECTED = 2;

var socket;
var state = DISCONNECTED;

var autos = [];
var json;

var autoMenuVisible = false;
var updater = null;

function toggleConnection() {
    if (state == DISCONNECTED) {
        connect();
    }
    else {
        state = DISCONNECTED;
        
        socket.close();
        socket = null;
    }
}

function connect() {
    socket = new WebSocket("ws:roborio-3128-frc.local:5800");

    element('conn_button').classList.remove('red');
    element('conn_button').classList.remove('green');
    element('conn_button').classList.add('orange');
    setInner('conn_button_text', 'Connecting...');
    state = CONNECTING;
    
    socket.onopen = function(event) {
        console.log("Connected.")

        element('conn_button').classList.remove('red');
        element('conn_button').classList.remove('orange');
        element('conn_button').classList.add('green');
        setInner('conn_button_text', 'Connected');
        state = CONNECTED;
    };

    socket.onmessage = function(event) {
        json = JSON.parse(event.data);

        if ("" + autos != "" + json['auto_programs']) {
            autos = json['auto_programs'];

            setup_auto_chooser();
        }

        if (updater != null) {
            updater(json);
        }
    };

    socket.onclose = function(event) {
        // TODO: If disconnected by robot (i.e. not due to user manually clicking the connection button,
        // automatically try to reconnect.)
        if (state == DISCONNECTED) {
            element('conn_button').classList.remove('green');
            element('conn_button').classList.remove('orange');
            element('conn_button').classList.add('red');
            setInner('conn_button_text', 'Disconnected');
        }
        else {
            state = CONNECTING;

            element('conn_button').classList.remove('green');
            element('conn_button').classList.remove('red');
            element('conn_button').classList.add('orange');
            setInner('conn_button_text', 'Reconnecting...');
        }
    };
}

function addUpdater(u) {
    updater = u;
}

function setup_auto_chooser() {
    noneElement = document.getElementById("auto_choice_none")

    document.getElementById("auto_list").innerHTML = noneElement.outerHTML;

    for (var i = 0; i < autos.length; i++) {
        var element = noneElement.cloneNode(true);

        element.id = "auto_choice_" + i
        element.setAttribute('onclick', "select_auto(" + i + ")")
        element.innerHTML = autos[i]

        document.getElementById("auto_list").appendChild(element);
    }
}

function openAutoMenu() {
    document.getElementById('auto_list').style.display = 'block';
    autoMenuVisible = true;
}

function closeAutoMenu() {
    document.getElementById('auto_list').style.display = 'none';
    autoMenuVisible = false;
}

function toggleAutoMenu() {
    if (!autoMenuVisible) {
        openAutoMenu();
    }
    else {
        closeAutoMenu();
    }
}

function select_auto(i) {
    if (i == "-1") {
        send("selectAuto:null");
    }
    else {
        send("selectAuto:" + autos[Number(i)]);
    }
    closeAutoMenu();
}

function buttonDown(name) {
    send("button:" + name + ":down");
}

function buttonUp(name) {
    send("button:" + name + ":up");
}

function send(string_data) {
    if (state == CONNECTED) {
        socket.send(string_data);
        console.log("Sent \'" + string_data + "\'");
    }
    else {
        console.log("Attempted to send \'" + string_data + "\'");
    }
}

function element(id) {
    return document.getElementById(id);
}

function setInner(id, innerHTML) {
    element(id).innerHTML = innerHTML;
}
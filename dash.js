var socket;
var connected = false;

var autos = [];
var json;

var autoMenuVisible = false;
var updater = null;

function toggleConnection() {
    if (!connected) {
        connect();
    }
    else {
        socket.close();
        socket = null;
    }
}

function connect() {
    socket = new WebSocket("ws:roborio-3128-frc.local:5800");
    
    socket.onopen = function(event) {
        connected = true;

        console.log("Connected.")

        element('conn_button').classList.remove('red');
        element('conn_button').classList.add('green');
        setInner('conn_button_text', 'Connected');
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
        connected = false;
        
        element('conn_button').classList.remove('green');
        element('conn_button').classList.add('red');
        setInner('conn_button_text', 'Disconnected');
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
    if (connected) {
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
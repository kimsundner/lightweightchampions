var bkg = 0;
var lightFlag = false;
var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {
   //lastMsgEl.innerHTML =  `text: ${d.text} <br />int: ${d.integer} <br />float: ${d.float}`;
}

function onDocumentReady() {
    var socket = new ReconnectingWebsocket("ws://" + location.host + "/serial");
    var sendFormEl = document.getElementById('sendForm');
    var lastMsg = null;
    lastMsgEl = document.getElementById('lastMsg');
    socket.onmessage = function(evt) {
        // Debug: see raw received message


        //If 1 get sent from Arduino, change the state from On --> Off or Off --> On
        if (evt.data == 1){
            if (lightFlag == false){
                lightFlag = true;
                //console.log("White");
            } else if (lightFlag == true) {
                lightFlag = false;
                //console.log("Black");
            }
        };
     
        // Changes the background colour from black to white depending on lightFlag state
        if (lightFlag == true){
            document.body.style.backgroundColor = "yellow";
        } else {
            document.body.style.backgroundColor = "black";

        }

        // DEBUGGING CONSOLELOG
        console.log(lightFlag);















        // Parse message, assuming <Text,Int,Float>
        var d = evt.data.trim();
        if (d.charAt(0) == '<' && d.charAt(d.length-1) == '>') {
            // Looks legit
            d = d.split(',');    
            if (d.length == 3) { // Yes, it has three components as we hoped
                handleCommand({
                    text:d[0].substr(1), 
                    integer: parseInt(d[1]), 
                    float: parseFloat(d[2].substr(0,d.length-1))
                });
                return;          
            }
        }
        
        // Doesn't seem to be formatted correctly, just display as-is
        // if (evt.data != lastMsg) {
        //     lastMsgEl.innerText =  evt.data;
        //     lastMsg = evt.data;
        // }
    }
    socket.onopen = function(evt) {
        console.log("Socket opened");
    }

    sendFormEl.addEventListener('submit', function(evt) {
        evt.preventDefault();
        var send = document.getElementById('sendtoSerial').value;
        socket.send(send);  
    })
}
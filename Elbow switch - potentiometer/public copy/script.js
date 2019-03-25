var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {
   lastMsgEl.innerHTML =  `text: ${d.text} <br />int: ${d.integer} <br />float: ${d.float}`;
}

function onDocumentReady() {
    var socket = new ReconnectingWebsocket("ws://" + location.host + "/serial");
    var sendFormEl = document.getElementById('sendForm');
    var lastMsg = null;
    lastMsgEl = document.getElementById('lastMsg');
    socket.onmessage = function(evt) {
        // Debug: see raw received message
        //console.log(evt.data);
        
        // if (evt.data > 1023/2) {
        //     document.getElementById("body").style.backgroundColor = "#000000";

        // };

        // if (evt.data < 1023/2) {
        //     document.getElementById("body").style.backgroundColor = "#ffffff";
        // };


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
        //     lastMsgEl.innerText = evt.data;
        //     lastMsg = evt.data;
        // }

        
        addedFunctionality(lastMsg, evt.data);
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
function rainbow(n) {
    let c;
    let u = scale(n, 0, 250, 0, 100);

    c = 'hsl(0, 0%, ' + u + '%)';

    console.log(u);
    return c;
}
function colourPick(i) {
    document.body.style.background = rainbow(i);
}

function addedFunctionality(msg, data){
    //console.log(msg);
    colourPick(data);
}

//added function for scaling (map() in arduino) values
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
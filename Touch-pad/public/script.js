var bkg = 0;
let bkgOld = bkg;
var lightFlag = false;
var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

let timestamp, oldStamp;

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
        
        // Constantly take the time and put it into a variable to be used later.
      timestamp = new Date;

    //   When a button is clicked a '1' is sent to the server and it clocks bkg and the time
      if (evt.data == 1){
          ogTime = new Date;
          ogBkg = bkg;
      }

    //   If it's been more than 1 second since the server got a 1, look for 2 or 3 to either brighten or dim the light
      if ((ogTime.getTime() - timestamp.getTime() / 1000) >= 1){
        if (evt.data == 2 && bkg < 250) bkg += 5;
        if (evt.data == 3 && bkg > 5) bkg -= 5;
      }

    //   When a 4 is recieved (from button released) check if the bkg has been altered. if it has not turn light on or off
      if (evt.data == 4 && ogBkg == bkg ){
        if (lightFlag == false){
            lightFlag = true;
        } else if (lightFlag == true) {
            lightFlag = false;
        }
      }
        // Changes the background colour from black to white depending on lightFlag state
    if (lightFlag == true){ 
        // document.body.style.backgroundColor = "yellow";
        document.body.style.backgroundColor = "rgb(255, 255, " + bkg + ")";
    } else {
        document.body.style.backgroundColor = "black";
    }
    


              // if (evt.data >= 2) {

        //     if (evt.data == 2 && bkg < 250) bkg += 5;
        //     if (evt.data == 3 && bkg > 5) bkg -= 5;
            
        // }
    //     if (evt.data == 1 ){
    //         if (lightFlag == false){
    //             lightFlag = true;
    //             //console.log("White");
    //         } else if (lightFlag == true) {
    //             lightFlag = false;
    //             //console.log("Black");
            
    //         }
    //     };
     

        // DEBUGGING CONSOLELOG
        // console.log(lightFlag);
        console.log("d: " + bkg);
        if (evt.data == 3) console.log("Dimming down");
        if (evt.data == 2) console.log("Dimming up");
 
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
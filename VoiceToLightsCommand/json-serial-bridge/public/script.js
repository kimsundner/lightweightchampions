var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleData(obj) {
  // At this point we could call functions based on received data etc.
  // eg: if (obj.x > 10) runThis()
}

function onDocumentReady() {
  var socket = new ReconnectingWebsocket('ws://' + location.host + '/serial');
  var sendFormEl = document.getElementById('sendForm');
  var lastMsg = null;
  lastMsgEl = document.getElementById('lastMsg');

  // Handle incoming messages
  socket.onmessage = function (evt) {
    var d = evt.data.trim();
    var obj = {};
    try {
      obj = JSON.parse(d);
    } catch (e) {
      if (d === lastMsg) return; // Don't repeat
      lastMsgEl.innerText = 'Couldn\'t parse, see console for details.';
      console.log(e);
      console.log('Received: ' + d);
      lastMsg = d;
      return;
    }

    // Pass parsed object over to a function to handle
    handleData(obj);

    // Display data for debug purposes
    if (d !== lastMsg) {
      // Don't update display if it's the same as before
      lastMsgEl.innerText = d;
    }
  };
  socket.onopen = function (evt) {
    console.log('Socket opened');
  };

  // If annyang has run successfully, execute the following code;
  if (annyang) {

    // Relevant functions which the annyang software will refer to through the "declared commands" specified further down.

    // Function which the voice commands will execute once recognized. This is for the lights off command.
    var lightsOff = function () {
      //Send value to form
      document.getElementById("sendtoSerial").value = "{\off\:1}";

      // Function which the voice commands will execute once recognized. This is for the lights on command.
    };
    var lightsOn = function () {

      //Send value to form
      document.getElementById("sendtoSerial").value = "{\on\:1}";

    };

    // Function which the voice commands will execute once recognized. This is for confirming the voice commands, and sending it to the serial. 
    var confirm1 = function (evt) {
      var send = document.getElementById('sendtoSerial').value;
      socket.send(send);

    };

    // Previously mentioned declared commands. Here, voice commands (words to be recognized), are declared and paired with a previously mentioned relevant function.
    var commands = {
      'Lights off': lightsOff,
      'Lights on': lightsOn,
      'Confirm': confirm1,
    };

    // An optional debug mode for detailed logging in the console. Left intact for legacy and developer needs.
    annyang.debug();

    // Add the voice commands. Here, the declared commands are added to the current session of annyang.
    annyang.addCommands(commands);

    // Set a language for speech recognition. For the purpose of this prototype, English was chosen.  
    annyang.setLanguage('en');

    /* Tell Annyang to start listening for voice commands and recognize them. You can call this here, or attach this call to an event, button, etc. 
    However for this purpose I have chosen for it to activate on load. */
    annyang.start();
  } else {
    $(document).ready(function () {
      $('#unsupported').fadeIn('fast');
    });
  }
}
/*
Partially created with code from Clint Heyer's Interactivity (https://github.com/ClintH/interactivity). Used as a base for the webserver and json-serial-bridge.
Annyang (WIP)
Code by Jovan
*/
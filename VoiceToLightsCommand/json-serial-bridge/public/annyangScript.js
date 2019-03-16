"use strict";
  
// If annyang has run successfully, execute the following code
if (annyang) {

  // Relevant functions which the annyang software will refer to through the "declared commands" specified further down.
  var lightsOff = function() {
    console.log("Lights off")
    document.getElementById("sendtoSerial").value = "{\off\:1}"
    document.getElementById("sendtoSerial").submit();
  };
  var lightsOn = function() {
    console.log("Lights on")
    document.getElementById("sendtoSerial").value = "{\on\:1}"
    document.getElementById("sendtoSerial").submit();
  };
  
  // Previously mentioned declared commands. Here, voice commands (words to be recognized), are declared and paired with a previously mentioned relevant function.
  var commands = {
    'Lights off': lightsOff,
    'Lights on': lightsOn,
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
  $(document).ready(function() {
    $('#unsupported').fadeIn('fast');
  });
}

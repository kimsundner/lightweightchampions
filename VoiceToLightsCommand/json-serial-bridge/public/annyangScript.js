"use strict";
  
// Run if annyang is started successfullu.
if (annyang) {

  // Functions which the commands will execute once recognized.
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
  
  // Define commands.
  var commands = {
    'Lights off': lightsOff,
    'Lights on': lightsOn,
  };

  // OPTIONAL: activate debug mode for detailed logging in the console
  annyang.debug();

  // Add the voice commands. 
  annyang.addCommands(commands);

  // Set a language for speech recognition, English. 
  annyang.setLanguage('en');

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
} else {
  $(document).ready(function() {
    $('#unsupported').fadeIn('fast');
  });
}

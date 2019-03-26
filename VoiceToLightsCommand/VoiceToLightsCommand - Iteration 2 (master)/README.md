This application uses a speech recognition JavaScript library, Annyang (https://www.talater.com/annyang/), to send json strings to an arduino through a form. These commands control the on board led light of an arduino Micro. In the case where an on board led light does not exist, simply hook up a led diode to pin 13. Verbal commands, such as "Lights off" and "Lights on" can be recognized by the software. These commands, once recognized, can be sent to the arduino through the keyword "confirm". Once the commands are sent, and recognized, the action will be preformed. 

Additional content of being able to turn on and off other external lights has been implemented, where the user can, for this prototype, control three lights named "a" "b" and "c". 

General usage tutorial below. Further info on arduino wiring under abclightschematic. 

----

Usage:

NOTE IMPORTANT: A microphone must be connected and allowed by the browser to record. Internet connection is required for everything to function properly.

1. Clone/download package

Connect an arduino, and upload code.

2. Run:

in the general dictionary run:

npm install

(eg ...C:\Users\Name\Documents\GitHub\lightweightchampions\VoiceToLightsCommand\VoiceToLightsCommand - Iteration 2 (master) ...)

Recommended to use the command prompt with administrator mode on.

3. To test, start the Node.js sketch:

On Windows this might be similar to:

node app.js --serial com1 bridge

or on a Mac:

node app.js --serial /dev/tty.usbmodem1411 bridge

Open up http://localhost:4000/. This will allow you to send commands to the Node.js server.
4. Send voice commands to the Arduino. The commands, as of now, are:

Lights off (set the state to turn off the light)

Lights on (set the state to turn on the light)

Turn on light (letter) (turn on either light a, b or c)

Turn off light (letter) (turn off either light a, b or c)

Confirm. (confirm action)

e.g "lights on" ... "confirm" or "turn on light C" ... "confirm"

------

Credits to Annayang creator for Annyang, and Clint Heyer for the Json-Serial-Bridge example.

https://www.talater.com/annyang/
https://github.com/ClintH/interactivity

Code by Jovan
This application uses a speech recognition JavaScript library, Annyang (https://www.talater.com/annyang/), to send json strings to an arduino through a form. These commands control the on board led light (could add an auxiliary), where commands such as turn off and on (as of now) can be sent to it. WIP

Usage:

1. Clone/download package

Connect arduino, and upload code.

2. Run:

npm install

in the dictionary (json-serial-bridge)

possibly must run npm install windows-build-tools in an in an Admin command prompt, in the case of an error.

3. To test, start the Node.js sketch: node app.js.
On Windows this might be similar to:

node app.js --serial com5 bridge

or on a Mac:

node app.js --serial /dev/tty.usbmodem1411 bridge

Open up http://localhost:4000. This will allow you to send commands to the Node.js server. NOTE: Microphone must be connected and allowed by the browser to record.

4. Send voice commands to the Arduino. The commands, as of now, are:

Lights off (set the state to turn off the light)

Lights on (set the state to turn on the light)

Confirm. (confirm action)

e.g "lights on" ... "confirm".

------

Credits to Annayang creator and Clint Heyer for the Json-Serial-Bridge example.

Code by Jovan
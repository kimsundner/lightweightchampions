In this example we have a switch and a dimmer with a potentiometer for a elbow interaction. It has two arduino folders one for a switch that turns on/off that was taken from the eduIntro library that uses a button.
And the second one that is used for the potentiometer(dimmer). It read the value of the potentiometer and maps it from 0-250, and prints it to the serial monitor. 

We mainly made changes to the public folder within the serial bridge folder. Where we find the html, js and css files, all changes were made in the html and js file. In the html file we removed/commented out some of the preset features of the browser to suit our purposes, we wanted a clean body to show the color changes. There are four new functions made that read the value of the potentiometer and translates it into hsl color scheme that displays on the body's background. We also created a function for the value of the potentiometer not to go above 100 because we wanted the colors to go from white to black. We have declared a function that maps the value of the arduino from 0-250 to 0-100.  



Collaborators: Kim Sundnér, Aziza Bahaviddinova




Intructions on how to set up serial bridge taken from the interactivity-master folder, written by Clint Heyer.

# Architecture

The demo consists of three bits: an Arduino sketch, a Node.js app, and a web app.

* The Arduino sketch sends/receives via serial over USB
* A Node.js app connects to the computer's serial port. It's a webserver with websockets enabled. When serial data is received from the Arduino, it broadcasts it to all clients connected via websockets. When data is received on the websocket, it sends it to the Arduino. You can open the connection to your Node.js server from any number of web browsers, including mobile devices!


# Setup and running

In the directory you've got this sample:

1. Run `npm install`
2. Upload _Arduino\Arduino.ino_ to your Arduino
3. Open the serial monitor and ensure that you're getting occasional data from the Arduino. Once satisfied, close the monitor so the port is available again. If you're getting gibberish, double check to make sure the baud rate of the serial monitor is 115,200 (set in the Arduino sketch)
4. Start the Node.js sketch: `node app`. Since you didn't specify which serial port represents the Arduino, you'll get a list of ports displayed. Once you identify the right port, run it again with the port. On Windows this might be something like `node app com5` or on a Mac: `node app /dev/tty.usbmodem1411`. The port name is the often the same or similar to what shows up in the Arduino IDE.
5. Once started, you'll see the same periodic data showing up in the terminal, yay - data is being piped from the Arduino to browser land.
6. In your browser, open up `http://localhost:4000`. This will allow you to send commands to the Node.js server, which in turn forwards it to the Arduino. Likewise, messages sent by the Arduino are displayed in the web page.

Hack away! Try making a simple command system so that a particular function runs on the Arduino when a certain command is sent from the browser, or making something happen in the browser based on a command sent from the Arduino.


# Read more

More on:
* [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)

Bundles:
* [reconnecting-websocket](https://github.com/pladaria/reconnecting-websocket) wrapper (v3.2.2)

Credits:
* Arduino serial I/O: http://forum.arduino.cc/index.php?topic=396450

# footPedalMS

This example utilizes Clint Heyer's motion-stream tutorial that streams motion and orientation data from a mobile device via websockets to a server with a modification in the code that adjusts the colors on screen of the server that imitates dimming of the light. The mobile device is to be attached on our foot pedal prototype, then as the change gamma rotation gets registered by websockets through motion-stream while the footpedal is stepped, the color on screen changes. This prototype and code simulates the dimming of light depending on the orientation of the mobile device attached to the foot pedal. 

# Setup 

To begin with, clone the entire "lightweightchampions" package from GitHub. 
After you have cloned the package, pinpoint it's location, cd to the location of the directory when running it in terminal and run:

`$ npm install`

eg: kornelias-air:~ kornelia_papp$ cd /Users/kornelia_papp/Documents/lightweightchampions/footPedalMS npm install

This will install the necessary package from npm.

# Running

Once you have set this up, you can boot up your server by keying in

`$ npm start`

eg: kornelias-air:footPedalMS kornelia_papp$ npm start
> websockets-skeleton@0.0.1 start /Users/kornelia_papp/Documents/lightweightchampions/footPedalMS
> node server.js

Webserver started on 8080

Once the webserver starts, key in ` http://localhost:8080/` on your web browser, and key in your `wifi IP address: 8080` on your mobile server. Now they will communicate with each other and as your footpedal gets oriented in the gamma rotation, the lights on webpage will be manipulated.


It will continue running unless you stop it by exiting terminal or pressing CTRL+C (PC) or CMD+C (Mac).


# Read More

Credits to Clint Heyer for the motion-stream tutorial.
https://github.com/ClintH/interactivity

Code by Kornelia Papp

// Variables in global scope
var socket = null;
var frozen = false;

// Variable document states 
if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

// If this function is called, screen unfreezes, vice versa if screen not pressed
function ready() {
  
  document.getElementById('last').addEventListener('click', e=> {
    frozen = !frozen;
    document.getElementById('last').classList.toggle('frozen');
  });
  
    
  initWebsocket();
}



function onData(e) {
  //Variable for acceleration, not used 
  var accel = e.accel;

  // Variable for acceleration of gravity, not used 
  var accelGrav = e.accelGrav;

  //Variable for rotation, using gamma
  var rot = e.rot;

  // Check
  //console.log(rot.gamma);
  addedFunctionality(e);

  // Commented out the calling of the function showData because we're not using it
  //if (!frozen) showData(e);
}

  // Created new function that targets the gamma rotation from the motion-stream tutorial and calls the colourPick function
function addedFunctionality(e){
  colourPick(e.rot.gamma); 
  
}

// Function for dimming/changing colour on document
function dimIt(n) {
  let c;
  // Scale down the min and max value to a usable value for the minor rotation the foot pedal will create
  let u = scale(n, 0, 10, 0, 100); 
 

  c = 'hsl(0, 0%, ' + u + '%)';
  // Check
  console.log(u);
  return c;
}

// Changing color of body of whole document 
function colourPick(i) {
  document.body.style.background = dimIt(i);
}


// Added a function for scaling (map() in Arduino) values
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


function initWebsocket() {
  const url = 'ws://' + location.host + '/ws';
  socket = new ReconnectingWebsocket(url);

  // Connection has been established
  socket.onopen = function(evt) {
    console.log('Web socket opened: ' + url);
  };

  // Received a message
  socket.onmessage = function(evt) {
    // To convert text back to an object (if it was sent with 'sendObject'):
    var o = JSON.parse(evt.data);
    onData(o);
  };

}

// Will not use this function because have removed the display from index.html 
/*
function showData(m) {
  let html = 'accel';
  html += '<table><tr><td>' + m.accel.x.toFixed(3) + '</td><td>' + m.accel.y.toFixed(3) + '</td><td>' + m.accel.z.toFixed(3) + '</tr></table>';
  html += '</table>';
  
  html += 'rot';
  html += '<table><tr><td>' + m.rot.alpha.toFixed(3) + '</td><td>' + m.rot.beta.toFixed(3) + '</td><td>' + m.rot.gamma.toFixed(3) + '</tr></table>';
  
  html += 'rotMotion';
  html += '<table><tr><td>' + m.rotMotion.alpha.toFixed(3) + '</td><td>' + m.rotMotion.beta.toFixed(3) + '</td><td>' + m.rotMotion.gamma.toFixed(3) + '</tr></table>';
  
  html += 'accelGrav';
  html += '<table><tr><td>' + m.accelGrav.x.toFixed(3) + '</td><td>' + m.accelGrav.y.toFixed(3) + '</td><td>' + m.accelGrav.z.toFixed(3) + '</tr></table>';
  html += '</table>';
  document.getElementById('last').innerHTML = html;
}
*/

/*
footPedal_sketch uses an input device (a footpedal) to trigger changes on the neo pixels (light).
This is a demonstration on how to use an input device to trigger changes on neo pixels.
Partial credit from Adafruit_Neopixel
@author Kornelia Papp
@date 032519
*/

// Adafruit_Neopixel_Master library
#include <Adafruit_NeoPixel.h>

// Definitions 
#define BUTTON_PIN      2    // Digital IO pin D2connected to the button. On a high -> low
                          // transition the button press logic will execute.
                          
#define PIN             6 // Data output pin D6 (Arduino)

#define PIXEL_NUM       10 // Number of Neo-Pixels in series
#define DELAY_TIME      100 // Delay value (miliseconds)

// Setup the NeoPixel library, tell it how many pixels, and which pin to use to send data.
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(PIXEL_NUM, PIN, NEO_RGB + NEO_KHZ800);

bool oldState = HIGH;
int showType = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pixels.begin();
  Serial.begin(9600);
  pixels.show(); // Initialize all pixels to 'off'
}
// End setup
// Main method (non-terminating) loop

void loop() {
  // Get current button state.
  bool newState = digitalRead(BUTTON_PIN);

  // Check if state changed from high to low (button press).
  if (newState == LOW && oldState == HIGH) {
    // Short delay to debounce button.
    delay(20);
    // Check if button is still low after debounce.
    newState = digitalRead(BUTTON_PIN);
    if (newState == LOW) {
      showType++;
      if (showType > 4)
        showType = 0;
      startShow(showType);
    }
  }
  
// Set the last button state to the old state.
oldState = newState;

}

void startShow(int i) {
  switch(i){
    case 0: colorWipe(pixels.Color(0, 0, 0), 50);    // Black/off
            break;
    case 1: colorWipe(pixels.Color(255,245,238), 50);  //Seashell
            break;
    case 2: colorWipe(pixels.Color(255,99,71), 50);  // Tomato
            break;
    case 3: colorWipe(pixels.Color(153,50,204), 50);  // Dark orchid
            break;
    case 4: colorWipe(pixels.Color(65,105,225), 50);  // Royal Blue
            break;
  }
}

// Fill the pixels one after the other with color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i= 0; i< pixels.numPixels(); i++) {
    pixels.setPixelColor(i, c);
    pixels.show();
    delay(wait);
  }
}


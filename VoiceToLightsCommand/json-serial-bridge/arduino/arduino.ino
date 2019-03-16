// ArduinoJson - Version: 5.13.2
#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

#define LED 13
#define READ_PIN 0
@@ -37,18 +41,28 @@ void readInput() {
  DynamicJsonBuffer jsonBuffer(bufferSize);


 //LEGACY for testing

 //int off = root["off"];
  //for (int i=0;i<off; i++) {
    //digitalWrite(LED, LOW);
    //delay(100);
  //}

  DynamicJsonBuffer jb;
  JsonObject& root = jb.parseObject(Serial);

  if (!root.success()) return;

//Code for making the light blink //not yet implemented
  int blinkCount = root["blink"];
  for (int i=0;i<blinkCount; i++) {
    digitalWrite(LED, HIGH);
    delay(100);
  int off = root["off"];

//Code for turning the led light off
  for (off) {
    digitalWrite(LED, LOW);
    delay(100);
  }
}
// Code for turning the led light on
  int on = root["on"];
  if (on){
    digitalWrite(LED, HIGH);
    delay(100);
  }
} 
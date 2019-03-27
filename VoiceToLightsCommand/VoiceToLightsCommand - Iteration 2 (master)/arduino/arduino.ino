// ArduinoJson - Version: 5.13.2
#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

int led1 = 2;
int led2 = 3; 
int led3 = 4;

#define LED 13
#define READ_PIN 0

void setup()  {
 pinMode(LED, OUTPUT);
 pinMode(led1, OUTPUT);
 pinMode(led2, OUTPUT);
 pinMode(led3, OUTPUT);
 Serial.begin(9600);
 while (!Serial) continue;
} 

void loop() {
  readInput();
  sendOutput();

}

void sendOutput() {
  // Use https://arduinojson.org/v5/assistant/ to get size of buffer
  // Here we assume the JSON {"a0": int}
  const size_t bufferSize = JSON_OBJECT_SIZE(1) + 10;
  DynamicJsonBuffer jsonBuffer(bufferSize);
  JsonObject& root = jsonBuffer.createObject();
  root["a0"] = analogRead(READ_PIN);
  
  root.printTo(Serial);
  Serial.println();
}

void readInput() {
   if (!Serial.available()) return;
    
  // Use https://arduinojson.org/v5/assistant/ to get size of buffer
  // Here we assume the JSON {"blink": int}
  const size_t bufferSize = JSON_OBJECT_SIZE(1) + 10;
  DynamicJsonBuffer jsonBuffer(bufferSize);

  DynamicJsonBuffer jb;
  JsonObject& root = jb.parseObject(Serial);

  int off = root["off"];
  if (off) {
    digitalWrite(LED, LOW);
    delay(100);
  }
  int on = root["on"];
  if (on){
    digitalWrite(LED, HIGH);
    delay(100);
  }
  int a1 = root["a1"];
  if (a1){
    digitalWrite(led1, HIGH);
    delay(100);
  }  
 int b1 = root["b1"];
  if (b1){
    digitalWrite(led2, HIGH);
    delay(100);
  }  
 int c1 = root["c1"];
  if (c1){
   digitalWrite(led3, HIGH);
   delay(100);
  }
 int a0 = root["a0"];
  if (a0) {
    digitalWrite(led1, LOW);
    delay(100);
  }
 int b0 = root["b0"];
  if (b0) {
    digitalWrite(led2, LOW);
    delay(100);
  }

 int c0 = root["c0"];
  if (c0) {
    digitalWrite(led3, LOW);
    delay(100);
  };
  
};
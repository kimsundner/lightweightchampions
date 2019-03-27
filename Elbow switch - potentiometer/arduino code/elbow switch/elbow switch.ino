int sensorPin = A5;
int ledPin = 7;
int sensorValue = 0;


void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  sensorValue = analogRead(sensorPin);
  sensorValue = map(sensorValue, 0, 1023, 0, 250);
 
  delay(20);
  
   Serial.println(sensorValue);
}

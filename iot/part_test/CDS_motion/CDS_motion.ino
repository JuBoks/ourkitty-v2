#define CDS 32

void setup() {
  Serial.begin(115200);
  // pinMode(INPUT_PULLUP, CDS);
}

void loop() {
  Serial.println(analogRead(CDS));
  delay(5000);
}

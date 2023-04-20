#define SR04_TRIG 8
#define SR04_ECHO 9
#define LED 13
// LED를 A0핀으로 설정합니다.

 
// 실행시 가장 먼저 호출되는 함수이며, 최초 1회만 실행됩니다.
// 변수를 선언하거나 초기화를 위한 코드를 포함합니다.
void setup() {
  Serial.begin(9600);
  //초음파 송신부-> OUTPUT, 초음파 수신부 -> INPUT,  LED핀 -> OUTPUT
  pinMode(SR04_TRIG, OUTPUT);
  pinMode(SR04_ECHO, INPUT);
  pinMode(LED, OUTPUT);
}
 
// setup() 함수가 호출된 이후, loop() 함수가 호출되며,
// 블록 안의 코드를 무한히 반복 실행됩니다.
void loop() {
  digitalWrite(SR04_TRIG, LOW);
  digitalWrite(SR04_ECHO, LOW);
  delayMicroseconds(2);
  digitalWrite(SR04_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(SR04_TRIG, LOW);
 
  unsigned long duration = pulseIn(SR04_ECHO, HIGH);
 
  // 초음파의 속도는 초당 340미터를 이동하거나, 29마이크로초 당 1센치를 이동합니다.
  // 따라서, 초음파의 이동 거리 = duration(왕복에 걸린시간) / 29 / 2 입니다.
  float distance = duration / 29.0 / 2.0;
 
  // 측정된 거리 값를 시리얼 모니터에 출력합니다.
  Serial.print(distance);
  Serial.println("cm");
 
  // 측정된 거리가 10cm 이하라면, 아래의 블록을 실행합니다.
  if (distance < 10) {
    // LED가 연결된 핀의 로직레벨을 HIGH (5V)로 설정하여, LED가 켜지도록 합니다.
    digitalWrite(LED, HIGH);
  }
  // 측정된 거리가 10cm 이상이라면, 아래의 블록을 실행합니다.
  else {
    // LED가 연결된 핀의 로직레벨을 LOW (0V)로 설정하여, LED가 꺼지도록 합니다.
    digitalWrite(LED, LOW);
  }
  // 0.2초 동안 대기합니다.
  delay(200);
}
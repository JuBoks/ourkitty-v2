#include<Servo.h> //Servo 라이브러리를 추가

#define SW              7
#define DOOR_OPEN       30
#define DOOR_CLOSE      0
Servo servo;      //Servo 클래스로 servo객체 생성
int value = 0;    // 각도를 조절할 변수 value


void setup() {
  Serial.begin(115200);
  Serial.println("Servo Test");
  servo.attach(9);     //servo 서보모터 7번 핀에 연결
                       // 이때 ~ 표시가 있는 PWM을 지원하는 디지털 핀에 연결
  delay(1000);
  pinMode(SW, INPUT_PULLUP);
}

void loop() {
  while(digitalRead(SW)) delay(100);
  Serial.println("SW detected");
  servo.write(DOOR_OPEN);
  delay(1000);
  servo.write(DOOR_CLOSE);
}
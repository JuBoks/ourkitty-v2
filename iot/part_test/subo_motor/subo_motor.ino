#include <Servo.h>  //Servo 라이브러리를 추가

Servo servo;    //Servo 클래스로 servo객체 생성
int value = 0;  // 각도를 조절할 변수 value


void setup() {
  Serial.begin(115200);
  Serial.println("Servo Test");
  servo.attach(21);  //servo 서보모터 7번 핀에 연결
                     // 이때 ~ 표시가 있는 PWM을 지원하는 디지털 핀에 연결
  delay(1000);
  pinMode(SW, INPUT_PULLUP);
}

void loop() {
  while (!Serial.available()) delay(100);
  int input = Serial.parseInt();
  servo.write(input);
  delay(1000);
  servo.write(90);
}
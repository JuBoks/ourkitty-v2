#include "HCPCA9685.h"

#define I2CAdd 0x40

int Servo4Position;
int SW1 = 8;  // 스위치를 D8 핀에 연결합니다.

HCPCA9685 HCPCA9685(I2CAdd);

void setup() {

  HCPCA9685.Init(SERVO_MODE);
  HCPCA9685.Sleep(false);

  Servo4Position = 400;  // 위치값의 초기값을 400으로 설정합니다.

  HCPCA9685.Servo(4, Servo4Position);  // 서보모터를 서보모터 드라이버 4번에 연결합니다.
  pinMode(SW1, INPUT_PULLUP);          // 스위치를 입력값으로 설정합니다.
}

void loop() {

  if (!digitalRead(SW1) == HIGH) {  // 스위치를 누르면
    delay(1000);                    // 1초간 지속
    Servo4Position = 155;           // 위치값 155의 위치로 이동
    HCPCA9685.Servo(4, Servo4Position);
    delay(2000);           // 2초간 지속
    Servo4Position = 400;  // 위치값 400 (초기 위치) 으로 이동
    HCPCA9685.Servo(4, Servo4Position);
  }
}
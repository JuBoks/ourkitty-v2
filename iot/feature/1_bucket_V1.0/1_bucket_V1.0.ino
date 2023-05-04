#include "WiFi.h"
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

// called this way, it uses the default address 0x40
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
// you can also call it with a different address you want
//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x41);
// you can also call it with a different address and I2C interface
//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x40, Wire);



// motor properties
#define SERVOMIN 150   // This is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX 600   // This is the 'maximum' pulse length count (out of 4096)
#define USMIN 600      // This is the rounded 'minimum' microsecond length based on the minimum pulse of 150
#define USMAX 2400     // This is the rounded 'maximum' microsecond length based on the maximum pulse of 600
#define SERVO_FREQ 50  // Analog servos run at ~50 Hz updates

#define DOOR_OPEN 400  //
#define DOOR_CLOSE 247

const uint8_t servonum = 4;


// ===========================
// Enter your WiFi credentials
// ===========================

// 아이유정 WIFI 정보
// const char* ssid = "EDU-ELR22-861823";  // 라우터
// const char* password = "12345678";

// 정호네 WIFI 정보
// const char* ssid = "EDU-ELR22-851139";  // 라우터
// const char* password = "12345678";

// 미현이네 WIFI 정보
// const char* ssid = "LGU+_M200_735A07"; // 와이파이 이름
// const char* password = "55343033"; // 와이파이 비밀번호

// 테스트용 WIFI 정보
const char* ssid = "KPHONE"; // 와이파이 이름
const char* password = "12348765"; // 와이파이 비밀번호

// AI 서버 도메인
String serverName = "k8e203.p.ssafy.io";  // 아이피 주소 기입

// String serialNumber = "2kXBPprXEcOdzPB"; // 아이유정
// String serialNumber = "EZZwEhRzzs9LvyZ";  // 정호네
// String serialNumber = "LpnNFcE3YrQS490"; // 미현이네

String serialNumber = "serial-1234-0001";
String serverPath = "/api/iot/weight";     // serverPath 기입


const int serverPort = 8000;  // 포트번호

WiFiClient client;
// ===========================
// End your WiFi credentials
// ===========================

// 배터리 충전삳태 상수. 0V ~ 5V 의 값을 1024단계로 나누어 단계를 표현
// 특정 전압 이상일 때 표시가 바뀌는 형식
// 아래 수치는 50000mA 배터리 기준
#define FULL 1000
#define SAFE 950
#define WARNING 850
#define DANGER 750

// pin config
#define MOTOR_ENABLE 25
#define SR04_TRIG 5
#define SR04_ECHO 18 

String sendData(float sonar_data, String code);
float checkBucket();
String checkBettery();

long start_time;

void setup() {
  Serial.begin(115200);
  Serial.println("8 channel Servo test!");

  // motor controller config
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates

  pwm.setPWM(servonum, 0, DOOR_CLOSE);

  // pin config
  pinMode(MOTOR_ENABLE, INPUT_PULLUP);

  WiFi.mode(WIFI_STA);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  delay(100);
  WiFi.begin(ssid, password);  

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("ESP32-CAM IP Address: ");
  Serial.println(WiFi.localIP());

  //초음파 송신부-> OUTPUT, 초음파 수신부 -> INPUT,  LED핀 -> OUTPUT
  pinMode(SR04_TRIG, OUTPUT);
  pinMode(SR04_ECHO, INPUT);
  
  start_time = millis();
  Serial.println("total test");
}

void loop() {
  long time_now = millis();
  if (!digitalRead(MOTOR_ENABLE)){
    pwm.setPWM(servonum, 0, DOOR_OPEN);
    delay(1000);
    pwm.setPWM(servonum, 0, DOOR_CLOSE);
    delay(1000);
  } 
  if (time_now - start_time > 300000) {
    sendData(checkBucket(), checkBettery());
    start_time = millis();
  }
  delay(100);
}

// 통신코드. 바디를 생성해서 넣어주면 알아서 작동
String sendData(float sensor_data, String code) {
  String getAll;
  String getBody;

  String body = "{\"dishSerialNum\": \"" + serialNumber + "\", \"dishWeight\": " + String(sensor_data) + ", \"dishBatteryState\": \""+ code +" \"}";

  Serial.println("Connecting to server: " + serverName);

  if (client.connect(serverName.c_str(), serverPort)) {
    Serial.println("Connection successful!");

    uint32_t totalLen = body.length();

    client.println("PUT " + serverPath + " HTTP/1.1");
    client.println("Host: " + serverName);
    client.println("Content-Type: application/json");
    client.println("Content-Length: " + String(totalLen));
    client.println();
    client.print(body);

    int timoutTimer = 10000;
    long startTimer = millis();
    boolean state = false;

    while ((startTimer + timoutTimer) > millis()) {
      Serial.print(".");
      delay(100);
      while (client.available()) {
        char c = client.read();
        if (c == '\n') {
          if (getAll.length() == 0) { state = true; }
          getAll = "";
        } else if (c != '\r') {
          getAll += String(c);
        }
        if (state == true) { getBody += String(c); }
        startTimer = millis();
      }
      if (getBody.length() > 0) { break; }
    }
    Serial.println();
    client.stop();
    Serial.println(getBody);
  } else {
    getBody = "Connection to " + serverName + " failed.";
    Serial.println(getBody);
  }
  return getBody;
}

// 사료통 용량 체크 코드
float checkBucket() {
  uint8_t count = 0;
  float sum = 0;
  while(count < 10) {
    digitalWrite(SR04_TRIG, LOW);
    // digitalWrite(SR04_ECHO, LOW);
    delayMicroseconds(2);
    digitalWrite(SR04_TRIG, HIGH);
    delayMicroseconds(10); 
    digitalWrite(SR04_TRIG, LOW);

    unsigned long duration = pulseIn(SR04_ECHO, HIGH);

    // 초음파의 속도는 초당 340미터를 이동하거나, 29마이크로초 당 1센치를 이동합니다.
    // 따라서, 초음파의 이동 거리 = duration(왕복에 걸린시간) / 29 / 2 입니다.
    float distance = duration / 29.0 / 2.0;
    // 측정된 거리의 총 합을 측정합니다.
    sum += distance;

    // 0.2초 동안 대기합니다.
    delay(200);
    count += 1;
  }
  sum /= count;
  Serial.print(sum);
  Serial.println("cm");
  return (sum);
}

// 배터리 용량 체크
String checkBettery() {
  int sum, avg;
  uint8_t count = 0;
  // 20회 측정 후 평균치 사용
  while(count < 20) {
    int sensorValue = analogRead(A0);
    sum += sensorValue ;
    delay(10);
    count++;
  }
  avg = sum / count;
  // 평균값에 맞는 전송수치 보내기
  String code;
  // 배터리 완충
  if (avg > FULL) {
    code = "0100001";
  }
  // 배터리 안정적
  else if (avg > SAFE) {
    code = "0100002";
  }
  // 배터리 경고
  else if (avg > WARNING) {
    code = "0100003";
  }
  // 배터리 위험
  else {
    code = "0100004";
  }

  return code;
}
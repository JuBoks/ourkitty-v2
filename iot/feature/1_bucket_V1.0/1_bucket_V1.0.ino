#include "WiFi.h"
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>


Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

// motor properties
#define SERVOMIN 150   // This is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX 600   // This is the 'maximum' pulse length count (out of 4096)
#define USMIN 600      // This is the rounded 'minimum' microsecond length based on the minimum pulse of 150
#define USMAX 2400     // This is the rounded 'maximum' microsecond length based on the maximum pulse of 600
#define SERVO_FREQ 50  // Analog servos run at ~50 Hz updates
#define DOOR_OPEN 400  //
#define DOOR_CLOSE 246

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
const char* ssid = "KPHONE";        // 와이파이 이름
const char* password = "12348765";  // 와이파이 비밀번호

// AI 서버 도메인
String serverName = "k8e203.p.ssafy.io";  // 아이피 주소 기입

// String serialNumber = "2kXBPprXEcOdzPB"; // 아이유정
// String serialNumber = "EZZwEhRzzs9LvyZ";  // 정호네
// String serialNumber = "LpnNFcE3YrQS490"; // 미현이네
String serialNumber = "asdf";

// String serialNumber = "serial-1234-0001";
String serverPath = "/api/iot/weight";  // serverPath 기입


const int serverPort = 8000;  // 포트번호

WiFiClient client;
// ===========================
// End your WiFi credentials
// ===========================

// 배터리 충전삳태 상수. 0V ~ 5V 의 값을 1024단계로 나누어 단계를 표현
// 특정 전압 이상일 때 표시가 바뀌는 형식
// 아래 수치는 50000mA 배터리 기준
#define FULL_BATTERY 2900 
#define EMPTY_BATTERY 1900  
// 사료통 용량 상수. EMPTY값은 사료통이 비었을 때 측정값.
#define FULL_BUCKET 0
#define EMPTY_BUCKET 31

// pin config
#define MOTOR_ENABLE 25
#define SR04_TRIG 5
#define SR04_ECHO 18
#define BATTERY 33

String sendData(String sonar_data, String code);
String checkBucket();
String checkBattery();

long start_time = 0;
long feed_time = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("8 channel Servo test!");

  // motor controller config
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates

  pwm.setPWM(servonum, 0, DOOR_CLOSE);

  // pin config
  pinMode(MOTOR_ENABLE, INPUT);

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
  sendData(checkBucket(), checkBattery());
  start_time = millis();
  Serial.println("total test");
}

void loop() {
  long time_now = millis();
  // if (digitalRead(MOTOR_ENABLE) && time_now - feed_time > 900000) {
  if (digitalRead(MOTOR_ENABLE)) {
    pwm.setPWM(servonum, 0, DOOR_OPEN);
    // 사료출구 열려있는 시간. 사료량을 이 값으로 조절
    delay(600);
    pwm.setPWM(servonum, 0, DOOR_CLOSE);
    feed_time = time_now;
  }
  if (time_now - start_time > 300000) {
    sendData(checkBucket(), checkBattery());
    start_time = time_now;
  }
  delay(5000);
}

// 통신코드. 바디를 생성해서 넣어주면 알아서 작동
String sendData(String sensor_data, String code) {
  String getAll;
  String getBody;

  String body = "{ \"dishSerialNum\": \"" + serialNumber + "\", \"dishWeight\": \"" + sensor_data + "\", \"dishBatteryState\": \"" + code + "\" }";

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
    client.stop();
    Serial.println(getBody);
  } else {
    getBody = "Connection to " + serverName + " failed.";
  }
  return getBody;
}

// 사료통 용량 체크 코드
String checkBucket() {
  uint8_t count = 0;
  float sum = 0;
  int term = (FULL_BUCKET / EMPTY_BUCKET) / 10;
  String code;
  while (count < 10) {
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
    // 측정된 거리의 총 합을 이용해서 평균을 측정합니다.
    sum += distance;

    // 0.2초 동안 대기합니다.
    delay(200);
    count += 1;
  }
  sum /= count;
  if (sum > FULL_BUCKET) {
    code = "0120011";
  }
  // 사료통 90%
  else if (sum > FULL_BUCKET - (1 * term)) {
    code = "0120010";
  }
  // 사료통 80%
  else if (sum > FULL_BUCKET - (2 * term)) {
    code = "0120009";
  }
  // 사료통 70%
  else if (sum > FULL_BUCKET - (3 * term)) {
    code = "0120008";
  }
  // 사료통 60%
  else if (sum > FULL_BUCKET - (4 * term)) {
    code = "0120007";
  }
  // 사료통 50%
  else if (sum > FULL_BUCKET - (5 * term)) {
    code = "0120006";
  }
  // 사료통 40%
  else if (sum > FULL_BUCKET - (6 * term)) {
    code = "0120005";
  }
  // 사료통 30%
  else if (sum > FULL_BUCKET - (7 * term)) {
    code = "0120004";
  }
  // 사료통 20%
  else if (sum > FULL_BUCKET - (8 * term)) {
    code = "0120003";
  }
  // 사료통 10%
  else if (sum > FULL_BUCKET - (9 * term)) {
    code = "0120002";
  }
  // 사료통 0%
  else {
    code = "0120001";
  }

  return code;
}

// 배터리 용량 체크
String checkBattery() {
  int sum, avg;
  uint8_t count = 0;
  int term = (FULL_BATTERY / EMPTY_BATTERY) / 10;
  // 20회 측정 후 평균치 사용
  while (count < 20) {
    int sensorValue = analogRead(BATTERY);
    sum += sensorValue;
    delay(10);
    count++;
  }
  avg = sum / count;
  // 평균값에 맞는 전송수치 보내기
  String code;
  // 배터리 완충
  if (avg > FULL_BATTERY) {
    code = "0100011";
  }
  // 배터리 90%
  else if (avg > FULL_BATTERY - (1 * term)) {
    code = "0100010";
  }
  // 배터리 80%
  else if (avg > FULL_BATTERY - (2 * term)) {
    code = "0100009";
  }
  // 배터리 70%
  else if (avg > FULL_BATTERY - (3 * term)) {
    code = "0100008";
  }
  // 배터리 60%
  else if (avg > FULL_BATTERY - (4 * term)) {
    code = "0100007";
  }
  // 배터리 50%
  else if (avg > FULL_BATTERY - (5 * term)) {
    code = "0100006";
  }
  // 배터리 40%
  else if (avg > FULL_BATTERY - (6 * term)) {
    code = "0100005";
  }
  // 배터리 30%
  else if (avg > FULL_BATTERY - (7 * term)) {
    code = "0100004";
  }
  // 배터리 20%
  else if (avg > FULL_BATTERY - (8 * term)) {
    code = "0100003";
  }
  // 배터리 10%
  else if (avg > FULL_BATTERY - (9 * term)) {
    code = "0100002";
  }
  // 배터리 0%
  else {
    code = "0100001";
  }

  return code;
}
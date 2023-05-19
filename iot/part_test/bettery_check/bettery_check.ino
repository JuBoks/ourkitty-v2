#include "WiFi.h"

#define BATTERY 33

// 배터리 충전삳태 상수. 0V ~ 5V 의 값을 1024단계로 나누어 단계를 표현
// 특정 전압 이상일 때 표시가 바뀌는 형식
// 아래 수치는 50000mA 배터리 기준
#define FULL        1000
#define EMPTY      750
// ===========================
// Enter your WiFi credentials
// ===========================
const char* ssid = "KPHONE"; // 와이파이 이름
const char* password = "12348765"; // 와이파이 비밀번호

String serverName = "k8e203.p.ssafy.io";   // 아이피 주소 기입
//String serverName = "example.com";   // 또는 도메인 네임

String serialNumber = "serial-1234-0001";
String serverPath = "/api/iot/weight";     // serverPath 기입

const int serverPort = 8000; // 포트번호

WiFiClient client;


String checkBattery();

void setup() {
  Serial.begin(115200);
  Serial.begin(115200);
  Serial.setDebugOutput(true);

  // WiFi.mode(WIFI_STA);
  // Serial.println();
  // Serial.print("Connecting to ");
  // Serial.println(ssid);
  // delay(100);
  // WiFi.begin(ssid, password);  

  // while (WiFi.status() != WL_CONNECTED) {
  //   Serial.print(".");
  //   delay(500);
  // }
  // Serial.println();
  // Serial.print("ESP32-CAM IP Address: ");
  // Serial.println(WiFi.localIP());


}

void loop() {
  Serial.println(analogRead(33));
  delay(5000);
}


String checkBattery() {
  int sum, avg;
  uint8_t count = 0;
  int term = (FULL / EMPTY) / 10;
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
  if (avg > FULL) {
    code = "0100011";
  }
  // 배터리 90%
  else if (avg > FULL - (1 * term)) {
    code = "0100010";
  }
  // 배터리 80%
  else if (avg > FULL - (2 * term)) {
    code = "0100009";
  }
  // 배터리 70%
  else if (avg > FULL - (3 * term)) {
    code = "0100008";
  }
  // 배터리 60%
  else if (avg > FULL - (4 * term)) {
    code = "0100007";
  }
  // 배터리 50%
  else if (avg > FULL - (5 * term)) {
    code = "0100006";
  }
  // 배터리 40%
  else if (avg > FULL - (6 * term)) {
    code = "0100005";
  }
  // 배터리 30%
  else if (avg > FULL - (7 * term)) {
    code = "0100004";
  }
  // 배터리 20%
  else if (avg > FULL - (8 * term)) {
    code = "0100003";
  }
  // 배터리 10%
  else if (avg > FULL - (9 * term)) {
    code = "0100002";
  }
  // 배터리 0%
  else {
    code = "0100001";
  }

  return code;
}


String sendData(String sensor_data) {
  String getAll;
  String getBody;

  Serial.println("Connecting to server: " + serverName);

  if (client.connect(serverName.c_str(), serverPort)) {
    Serial.println("Connection successful!");    
    String body = "{\"dishSerialNum\": \"" + serialNumber + "\", \"dishBettery\": \"" + sensor_data +"\"}";

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
          if (getAll.length()==0) { state=true; }
          getAll = "";
        }
        else if (c != '\r') { getAll += String(c); }
        if (state==true) { getBody += String(c); }
        startTimer = millis();
      }
      if (getBody.length()>0) { break; }
    }
    Serial.println();
    client.stop();
    Serial.println(getBody);
  }
  else {
    getBody = "Connection to " + serverName +  " failed.";
    Serial.println(getBody);
  }
  return getBody;
}


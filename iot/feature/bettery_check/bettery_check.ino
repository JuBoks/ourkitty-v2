#include "WiFi.h"

// 배터리 충전삳태 상수. 0V ~ 5V 의 값을 1024단계로 나누어 단계를 표현
// 특정 전압 이상일 때 표시가 바뀌는 형식
#define FULL        1000
#define SAFE        950
#define WARNING     900
#define DANGER      850
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

void setup() {
  Serial.begin(115200);
  Serial.begin(115200);
  Serial.setDebugOutput(true);

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
}

void loop() {
  int sensorValue = analogRead(A0);
  uint8_t code = 0;
  Serial.println(sensorValue);
  // 배터리 완충
  if (sensorValue > FULL) {
    code = 0;
  }
  // 배터리 안정적
  else if (sensorValue > SAFE) {
    code = 1;
  }
  // 배터리 위혐
  else if (sensorValue > WARNING) {
    code = 2;
  }
  // 배터리 경고
  else {
    code = 3;
  }

  sendData(sensorValue)
  delay(1000);
}

String sendData(uint8_t sensor_data) {
  String getAll;
  String getBody;

  Serial.println("Connecting to server: " + serverName);

  if (client.connect(serverName.c_str(), serverPort)) {
    Serial.println("Connection successful!");    
    String body = "{\"dishSerialNum\": \"" + serialNumber + "\", \"dishBettery\": " + String(sensor_data) +"}";

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


#include "WiFi.h"
// #include "soc/soc.h"
// #include "soc/rtc_cntl_reg.h"
// #include "driver/rtc_io.h"


#define SR04_TRIG 5
#define SR04_ECHO 18
// #define LED 13

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

  //초음파 송신부-> OUTPUT, 초음파 수신부 -> INPUT,  LED핀 -> OUTPUT
  Serial.print("PinMode Setting : ");
  pinMode(SR04_TRIG, OUTPUT);
  pinMode(SR04_ECHO, INPUT);
  // pinMode(LED, OUTPUT);
  Serial.println("done.");
}

void loop() {
  Serial.println("loop start");
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
  
    // 측정된 거리 값를 시리얼 모니터에 출력합니다.
    Serial.print(distance);
    Serial.println("cm");
  
    // 측정된 거리의 총 합을 측정합니다.
    sum += distance;
    
    // 0.2초 동안 대기합니다.
    delay(200);
    count += 1;
  }

  sendData(sum / count);

  delay(20000);
}

String sendData(float sensor_data) {
  String getAll;
  String getBody;

  Serial.println("Connecting to server: " + serverName);

  if (client.connect(serverName.c_str(), serverPort)) {
    Serial.println("Connection successful!");    
    String body = "{\"dishSerialNum\": \"" + serialNumber + "\", \"dishWeight\": " + String(sensor_data) +"}";

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

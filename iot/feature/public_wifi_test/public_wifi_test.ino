#include <WiFi.h>

#include "wpa2_enterprise.h"

const char* ssid = "Public Wifi Secure";
const char* username = "wifi";
const char* password = "wifi";

void setup() {
  Serial.begin(115200);
  
  WiFi.mode(WIFI_STA);
  wifi_station_set_enterprise_identity((uint8*)username, strlen(username)); // set the enterprise identity

  WiFi.begin(ssid, password); // connect to the WiFi network
  
  while (WiFi.status() != WL_CONNECTED) { // wait until connected to the network
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("Connected to WiFi!");
}
}

void loop() {
  // Your code here
}

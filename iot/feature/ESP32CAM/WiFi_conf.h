
#if defined(IU)
const char* ssid = "EDU-ELR22-861823"; // 라우터
const char* password = "12345678";
String serialNumber = "2kXBPprXEcOdzPB"; // 아이유정
#elif defined (JUNGHO)
const char* ssid = "EDU-ELR22-851139"; // 라우터
const char* password = "12345678";
String serialNumber = "EZZwEhRzzs9LvyZ"; // 정호네
#elif defined (MIHYUN)
const char* ssid = "LGU+_M200_735A07"; // 와이파이 이름
const char* password = "55343033"; // 와이파이 비밀번호
String serialNumber = "LpnNFcE3YrQS490"; // 미현이네
#elif defined (SSAFY_TEST)
const char* ssid = "KPHONE"; // 와이파이 이름
const char* password = "12348765"; // 와이파이 비밀번호
String serialNumber = "asdf"; // 미현이네
#else
#error "WiFi target not selected"
#endif

String serverName = "k8e2031.p.ssafy.io";   // 아이피 주소 기입
String serverPath = "/upload-google";     // serverPath 기입

const int serverPort = 8000; // 포트번호
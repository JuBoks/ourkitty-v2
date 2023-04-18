import serial
import threading
import io
import time
import base64
from PIL import Image

PORT = "COM8"
baud = 500000

ser = serial.Serial(PORT, baud, timeout=1)

def main():
    thread = threading.Thread(target=readthread, args=(ser,), daemon=True)  # 시리얼 통신 받는 부분
    thread.start()

    while True:
        # data = '보낼데이터(byte형식으로 보내야함 byte,str.encode())'
        # ser.write(data)
        time.sleep(1)


def readthread(ser):  # 데이터 받는 함수
    # 쓰레드 종료될때까지 계속 돌림
    read_first_line = True
    while True:  # True 조건일대 쓰레드가 실행(원하는 조건문 변환해서 쓰세여)
        # data = list()
        if read_first_line:
            while not ser.readable():
                pass
            ser.readline()
        if ser.readable():                                              # 값이 들어왔는지 확인
            raw_base64_string = bytes.decode(ser.readline())            # 값을 모두 받음(base64(byte)형식)
            print(raw_base64_string)
            raw_byte_data = base64.b64decode(raw_base64_string)         # 디코딩 (base64 -> bytes)
            print(type(raw_byte_data))
            with open("./test_img.jpg", "wb") as f:
                f.write(raw_byte_data)

        time.sleep(10)
    ser.close()


main()  # 메인문 실행
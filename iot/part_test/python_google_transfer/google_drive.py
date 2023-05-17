import cv2
import urllib.request
import numpy as np
import time
import os
import dotenv
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth



# # 환경변수 설정
dotenv.load_dotenv()
root_url = os.getenv("ROOT")     # esp32cam의 url주소
folder = os.getenv("FOLDER")    # Google Drive 폴더 주소
print(root_url, folder)
cv2.namedWindow("live transmission", cv2.WINDOW_AUTOSIZE)

# 화질 선택. 아래의 줄 중 하나를 선택해서 주석 해제
url = root_url + "cam-lo.jpg"   # 저화질
# url = root_url + "cam-mid.jpg"  # 중화질
# url = root_url + "cam-hi.jpg"   # 고화질
count = 0

gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)

while True:
    img_resp = urllib.request.urlopen(url)
    imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    frame = cv2.imdecode(imgnp, -1)

    cv2.imshow("live transmission", frame)

    key = cv2.waitKey(5)

    if key == ord('k'):
        count += 1
        t = f'{count}.png'
        cv2.imwrite(f"images/{t}", frame)
        print("image saved as: " + t)
        f = drive.CreateFile({'parents': [{'id': folder}], 'title': t})
        f.SetContentFile(f'images/{count}.png')
        f.Upload()
        print("image uploaded as: " + t)

    if key == ord('q'):
        break
    else:
        continue

cv2.destroyAllWindows()
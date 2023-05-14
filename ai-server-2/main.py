from fastapi import FastAPI
# from face_detection import detection
from face_detection import detection
from image_clustering import cluster_images
from tnr_filtering import detect_tnr
from common.util import save_image_from_url, empty_directory, save_json_file, get_json_file
import requests
import os
from dotenv import load_dotenv

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

FILE_SAVE_PATH = os.path.abspath('datasets/0_files')
JSON_PATH = os.path.abspath('datasets/4_result')
BACK_URL = os.environ['BACK_URL']

@app.get("/")
def index():
  return "Hello World!"

# @app.get("/file")
def get_files(serial_number, date, file_path):
  # 폴더 비우기
  empty_directory(f'{file_path}/*')

  url = "/ai/image"
  params = {
    'date': date,
    'dishSerialNum': serial_number
  }
  response = requests.get(BACK_URL + url, params=params)
  # 응답 처리
  if response.status_code != 200:
     return {'status': 500, 'message': "get files failed." }
  
  result = response.json()  # JSON 응답 데이터 파싱

  os.makedirs(file_path, exist_ok=True)
  
  img_info = {}
  for el in result['data']:
    path = el['imagePath']
    id = el['dishImageId']
    save_image_from_url(path, f'{file_path}/{id}.jpg')
    img_info[f'{id}.jpg'] = path

  return img_info

@app.get("/info")
def face_detection(serial_number, date):
  file_name = f'{date}_{serial_number}.json'
  result = get_json_file(file_name)

  return result

@app.get("/detection")
def face_detection(serial_number, date):
  folder_name = os.environ[f'{serial_number}']
  file_path = os.path.abspath(f'{FILE_SAVE_PATH}/{folder_name}')

  # 1. back으로부터 사진 파일 다운로드 하기
  img_info = get_files(serial_number, date, file_path)

  # 2. 다운로드 받은 사진들에 대해서 detection 진행하기
  detection(file_path)

  # 3. cluster 진행
  result = cluster_images()

  # 4. tnr판별
  detect_tnr(result['closest_images'])

  # 5. 데이터 정제
  for el in result['representative_images']:
    el[1] = img_info[el[1]]
  for el in result['file_feature_info']:
    el[0] = img_info[el[0]]
  for images in result['closest_images']:
    for i in range(len(images)):
      images[i] = img_info[images[i]]

  # 6. 데이터(result) 저장
  file_name = f'{date}_{serial_number}'
  save_json_file(result, file_name)

  return result
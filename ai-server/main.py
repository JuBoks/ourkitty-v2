import os.path
import datetime
from glob import glob

# FastAPI에서 CORSMiddleware라는 모듈로 CORS를 제어한다.
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import asyncio
# Google
from google_drive import connect_to_google_drive, upload_photo
from dotenv import load_dotenv
from detr import detectCatByDetr
# YOLO
from yolov5.yolo import detectCatByYolo
# s3
from s3upload import upload_image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI(static_directory="static")

app.mount("/fastapi", app)
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],	# 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)

# Google Drive 서비스
googleService = connect_to_google_drive()

# Spring 서버 URL
# SERVER_URL = 'https://ourkitty.site/api/pictures/'

@app.get("/")
async def index():
    return "Hello World!"

@app.post("/upload-google/{serial_number}")
async def upload_google_model_yolo_detr(serial_number, imageFile: UploadFile or None = None):
    if not imageFile:
        return {'status': 400, 'message': '업로드한 파일이 없습니다.'}

    # 이미지 파일인지 식별하기
    contentType, ext = imageFile.content_type.split('/')
    if(contentType != 'image'):
        return {'status': 500, 'message': '사진 파일만 올릴 수 있습니다.'}

    # 이미지 파일 읽기
    contents = await imageFile.read()

    # 이미지 파일 이름 설정
    fileName = os.environ[serial_number+"_NAME"]
    filePath = "static/img/"+fileName+".png"
    googleFileName = datetime.datetime.today().strftime("%Y-%m-%d_%H-%M-%S")
    googleFileName = fileName+"_"+googleFileName

    # 읽은 파일을 구글에 보내기 위해 서버에 저장
    with open("./static/img/"+fileName+".png", 'wb') as f:
        f.write(contents)

    # 딥러닝 모델 실행
    tasks = [
        asyncio.create_task(filterCatByYolo(filePath, googleFileName, contents)),
        asyncio.create_task(filterCatByDetr(filePath, googleFileName, googleFileName, contents, serial_number, imageFile, fileName))
    ]

    results = await asyncio.gather(*tasks)

    if results[1] == 200:
        return {'status': 200, 'message': "the image is uploaded on google drive."}
    else:
        return {'status': 200, 'message': "고양이 사진이 아닙니다."}

@app.post("/upload-s3/{serial_number}")
async def upload_s3(serial_number, imageFile: UploadFile or None = None):
    return upload_image(serial_number, imageFile)

@app.get("/yolo/pics")
@app.get("/yolo/pics/{site}")
def display_yolo_pics(site=None):
    return display_result_pics("yolo", site)

@app.get("/detr/pics")
@app.get("/detr/pics/{site}")
def display_detr_pics(site=None):
    return display_result_pics("detr", site)

@app.get("/img/pics/{site}")
@app.get("/img/pics/{site}/{time}")
@app.get("/img/pics/{site}/{time}/{date}")
def display_img_pics(site='iujeong', time=None, date=None):
    return display_pics("img", site, time, date)

def display_result_pics(folderName, site):
    if site == None:
        path = f"static/{folderName}/*.png"
    else:
        path = f"static/{folderName}/{site}*.png"

    image_list = glob(path)

    site = "모든 위치" if site == None else site

    html_content = f"<html><body><h3>[{folderName}] {site} 사진들</h3><div style='display: flex; gap: 10px; flex-wrap: wrap;'>"
    for image in image_list:
        dirpath, filename = os.path.split(image)
        html_content += f'<div><div>{filename}</div><img src="/{image}" alt="{image}" width="416" ></div>'
    html_content += "</div></body></html>"
    return HTMLResponse(content=html_content, status_code=200)

def display_pics(folderName, site, param_time=None, param_date=None):
    now = datetime.datetime.now()

    if param_date == None:
        date = now.strftime('%Y-%m-%d')
    else:
        # 문자열을 datetime 객체로 변환
        dt = datetime.datetime.strptime(param_date, "%y%m%d")
        # 문자열로 변환
        date = dt.strftime("%Y-%m-%d")

    if param_time == None:
        time = now.strftime('%H')
    else:
        time_int = int(param_time)
        if time_int >= 0 and time_int <= 24:
            time = "{:02d}".format(time_int)
        else:
            time = now.strftime('%H')

    if site == None:
        path = f"static/{folderName}/*_{date}_{time}*.png"
    else:
        path = f"static/{folderName}/{site}_{date}_{time}*.png"

    image_list = glob(path)

    html_content = f"<html><body><h3>{date}기준 {time}시 사진들</h3><div style='display: flex; gap: 10px; flex-wrap: wrap;'>"
    for image in image_list:
        dirpath, filename = os.path.split(image)
        html_content += f'<div><div>{filename}</div><img src="/{image}" alt="{image}" width="416" ></div>'
    html_content += "</div></body></html>"
    return HTMLResponse(content=html_content, status_code=200)


async def filterCatByYolo(filePath, googleFileName, contents):
    # 1. 이미지 파일을 yolo로 고양이 사진 필터링
    status, isDone = await detectCatByYolo(filePath)
    if status == 1:
        with open("./static/yolo/"+googleFileName+".png", 'wb') as f:
            f.write(contents)

    return status

async def filterCatByDetr(filePath, googleFileName, fileName, contents, serial_number, imageFile, commonFileName):
    # 1. 이미지 파일을 detr로 고양이 사진 필터링
    status, isDone = await detectCatByDetr(filePath, fileName)
    if status == 1:
        with open("./static/detr/"+googleFileName+".png", 'wb') as f:
            f.write(contents)

        # 구글에 사진 전송
        await upload_photo(googleService, commonFileName, googleFileName, serial_number, imageFile)
        
    return status

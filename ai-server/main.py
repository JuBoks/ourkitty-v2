import os.path

# FastAPI에서 CORSMiddleware라는 모듈로 CORS를 제어한다.
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, Request
from fastapi.staticfiles import StaticFiles
from datetime import datetime
import asyncio
# Google
from google_drive import connect_to_google_drive, upload_photo
from dotenv import load_dotenv
from detr import detectCatByDetr
# YOLO
from yolov5.yolo import detectCatByYolo

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()

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

# @app.post("/upload-google/{serial_number}")
async def upload_google_model_detr(serial_number, imageFile: UploadFile or None = None):
    if not imageFile:
        return {'status': 400, 'message': '업로드한 파일이 없습니다.'}
    else:
        # 이미지 파일인지 식별하기
        contentType, ext = imageFile.content_type.split('/')
        if(contentType != 'image'):
            return {'status': 500, 'message': '사진 파일만 올릴 수 있습니다.'}
        
        # 이미지 파일 읽기
        contents = await imageFile.read()

        # 이미지 파일 이름 설정
        commonFileName = os.environ[serial_number+"_NAME"]
        filepath = "static/img/"+commonFileName+".png"

        # 읽은 파일 서버에 저장
        with open("./static/img/"+commonFileName+".png", 'wb') as f:
            f.write(contents)

        # 이미지 파일을 detr로 고양이 사진 필터링
        status, isDone = await detectCatByDetr(filepath, commonFileName)

        # 고양이사진 인 경우 spring 서버로 보내기
        if isDone is False:
            if status == 0:
                msg = '고양이 사진이 아닙니다.'
            elif status == -1:
                msg = '사물인식 중 에러 발생'
            return {'status': 500, 'message': msg}
        
        # 구글에 사진 전송
        await upload_photo(googleService, commonFileName, serial_number, imageFile)

        return {'status': 200, 'message': "google serivce is done"}

# @app.post("/upload-google/{serial_number}")
async def upload_google_model_yolo(serial_number, imageFile: UploadFile or None = None):
    if not imageFile:
        return {'status': 400, 'message': '업로드한 파일이 없습니다.'}
    else:
        # 이미지 파일인지 식별하기
        contentType, ext = imageFile.content_type.split('/')
        if(contentType != 'image'):
            return {'status': 500, 'message': '사진 파일만 올릴 수 있습니다.'}
        
        # 이미지 파일 읽기
        contents = await imageFile.read()

        # 이미지 파일 이름 설정
        commonFileName = os.environ[serial_number+"_NAME"]
        filepath = "static/img/"+commonFileName+".png"

        # 읽은 파일 서버에 저장
        with open("./static/img/"+commonFileName+".png", 'wb') as f:
            f.write(contents)

        # 이미지 파일을 yolo로 고양이 사진 필터링
        status, isDone = await detectCatByYolo(filepath)

        # 고양이사진 인 경우 spring 서버로 보내기
        if isDone is False:
            if status == 0:
                msg = '고양이 사진이 아닙니다.'
            elif status == -1:
                msg = '사물인식 중 에러 발생'
            return {'status': 500, 'message': msg}
        
        # 구글에 사진 전송
        await upload_photo(googleService, commonFileName, serial_number, imageFile)

        return {'status': 200, 'message': "google serivce is done"}

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
    googleFileName = datetime.today().strftime("%Y%m%d%H%M%S")

    # 읽은 파일을 구글에 보내기 위해 서버에 저장
    with open("./static/img/"+fileName+".png", 'wb') as f:
        f.write(contents)

    # 딥러닝 모델 실행
    tasks = [
        asyncio.create_task(filterCatByYolo(filePath, googleFileName, contents)),
        asyncio.create_task(filterCatByDetr(filePath, googleFileName, fileName, contents, serial_number, imageFile))
    ]

    results = await asyncio.gather(*tasks)

    if results[1] == 200:
        return {'status': 200, 'message': "google serivce is done"}
    else:
        return {'status': 200, 'message': "고양이 사진이 아닙니다."}

    # 1. 이미지 파일을 yolo로 고양이 사진 필터링
    # status, isDone = await detectCatByYolo(filePath)

    # # 2. 이미지 파일을 detr로 고양이 사진 필터링
    # status, isDone = await detectCatByDetr(filePath, googleFileName)

    # # 고양이사진 인 경우 spring 서버로 보내기
    # if isDone is False:
    #     if status == 0:
    #         msg = '고양이 사진이 아닙니다.'
    #     elif status == -1:
    #         msg = '사물인식 중 에러 발생'
    #     return {'status': 500, 'message': msg}
    
    # # 구글에 사진 전송
    # await upload_photo(googleService, commonFileName, serial_number, imageFile)

    # return {'status': 200, 'message': "google serivce is done"}

async def filterCatByYolo(filePath, googleFileName, contents):
    # 1. 이미지 파일을 yolo로 고양이 사진 필터링
    status, isDone = await detectCatByYolo(filePath)
    if status == 1:
        with open("./static/yolo/"+googleFileName+".png", 'wb') as f:
            f.write(contents)

    return status

async def filterCatByDetr(filePath, googleFileName, fileName, contents, serial_number, imageFile):
    # 1. 이미지 파일을 detr로 고양이 사진 필터링
    status, isDone = await detectCatByDetr(filePath, googleFileName)
    if status == 1:
        with open("./static/detr/"+googleFileName+".png", 'wb') as f:
            f.write(contents)

        # 구글에 사진 전송
        await upload_photo(googleService, fileName, serial_number, imageFile)
        
    return status

import os.path

from fastapi import UploadFile
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload
from datetime import datetime
import cv2

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive.metadata', 
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive']

folder_id = "1k7JvUMnawrxUeYuZbDkw-spEuNYgarJx" #전송하고자 하는 폴더의 ID (nyang-ver2)

def connect_to_google_drive():
    """Shows basic usage of the Drive v3 API.
    Prints the names and ids of the first 10 files the user has access to.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('drive', 'v3', credentials=creds)
        return service
    except HttpError as error:
        # TODO(developer) - Handle errors from drive API.
        print(f'An error occurred: {error}')

async def upload_photo(service, imageFile: UploadFile or None = None):
    # 이미지 파일 읽기
    contents = await imageFile.read()

    # 읽은 파일 서버에 저장
    with open("static/img/image.png", 'wb') as f:
        f.write(contents)

    # Upload a file to google drive
    file_name = datetime.today().strftime("%Y%m%d%H%M%S")  
    file_metadata = {'name': file_name, 'parents': [folder_id], 'uploadType': 'multipart'}
    media = MediaFileUpload('static/img/image.png', mimetype='image/png')
    file = service.files().create(body=file_metadata, media_body=media, fields='id,webViewLink').execute()
    
    # 구글드라이브 링크 얻기
    print("File webViewLink :",file.get('webViewLink'))
    webviewlink = file.get('webViewLink')
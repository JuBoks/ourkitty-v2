from fastapi import FastAPI
# from face_detection import detection
from face_detection import detection
from image_clustering import cluster_images, copy_images
from tnr_filtering import detect_tnr, analyze_results

app = FastAPI()

@app.get("/")
def index():
  return "Hello World!"

@app.get("/detection")
def face_detection():
  # crop_dataset()

  detection()
  result = cluster_images()
  print(result)
  detect_tnr(result['closest_images'])
  # initialize()
  # arr = [['20230423125527.jpg', '20230423125548.jpg', '20230423125421.jpg', '20230424132053.jpg', '20230424131945.jpg'], ['iujeong_2023-04-28_23-16-46.jpg', '20230423143234.jpg', 'iujeong_2023-04-29_19-50-52.jpg', 'iujeong_2023-04-29_19-52-27.jpg', 'iujeong_2023-04-28_23-11-29.jpg'], ['20230427082809.jpg', '20230427083139.jpg', '20230427082729.jpg', '20230427082829.jpg', '20230427075259.jpg']]
  # copy_images(arr)

  # result = cluster_images()
  # print('cluster_images :: ', result)

  # result = {
  #   'closest_images': [['20230423125527.jpg', '20230423125548.jpg', '20230423125421.jpg', '20230424132053.jpg', '20230424131945.jpg'], ['iujeong_2023-04-28_23-16-46.jpg', '20230423143234.jpg', 'iujeong_2023-04-29_19-50-52.jpg', 'iujeong_2023-04-29_19-52-27.jpg', 'iujeong_2023-04-28_23-11-29.jpg'], ['20230427082809.jpg', '20230427083139.jpg', '20230427082729.jpg', '20230427082829.jpg', '20230427075259.jpg']]
  # }
  # result = detect_tnr(result['closest_images'])
  # print(result)
  # analyze_results()
  return "detection!"
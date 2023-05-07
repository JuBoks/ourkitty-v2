import subprocess
import ast

async def detectCatByYolo(input_path):
    cmd = f'python yolov5/detect.py --weights yolov5/weight/best.pt --img 480 --conf 0.7 --source {input_path} --project static/img --name yolov5 --save-txt --save-conf --exist-ok'
    output = subprocess.check_output(cmd, shell=True)
    output = output.decode('utf-8')
    result_arr = ast.literal_eval(output)

    if result_arr[0] and result_arr[1]:
      return 1, True
    else:
      return -1, False
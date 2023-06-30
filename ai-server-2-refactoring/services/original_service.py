import os
from fastapi import HTTPException, status

# models
from models.common import Response
from models.original import Original
# dao
import database.original as original_dao

async def create_original(serial_number: str, date: str, data:dict):
    # 같은 시리얼 번호, date는 삭제하기
    await delete_original(serial_number, date)

    result = await original_dao.add_original(data)
    return Response(status_code=status.HTTP_200_OK, content=result)

async def delete_original(serial_number: str, date: str):
    # id 찾기
    original = await original_dao.retrieve_original(serial_number, date)
    if original is None:
        return Response(status_code=status.HTTP_404_NOT_FOUND, content="There is no result")
    
    # 삭제하기
    isDeleted = await original_dao.delete_original(original.id)
    if isDeleted is None:
        raise HTTPException(status_code=500, detail=f"Deleting Original is failed")

    return Response(status_code=status.HTTP_200_OK, content="success")
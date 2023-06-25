from typing import List, Union
from beanie import PydanticObjectId
from models.detect import Detect

detect_collection = Detect


async def retrieve_detects() -> List[Detect]:
    detects = await detect_collection.all().to_list()
    return detects


async def add_detect(new_detect: Detect) -> Detect:
    detect = await new_detect.create()
    return detect


async def retrieve_detect(serial_number: str, date: str) -> Detect:
    detect = await detect_collection.find_one(
        {"serial_number": serial_number, "date": date}
    )
    if detect:
        return detect


async def delete_detect(id: PydanticObjectId) -> bool:
    detect = await detect_collection.get(id)
    if detect:
        await detect.delete()
        return True


async def update_detect_data(id: PydanticObjectId, data: dict) -> Union[bool, Detect]:
    des_body = {k: v for k, v in data.items() if v is not None}
    update_query = {"$set": {field: value for field, value in des_body.items()}}
    detect = await detect_collection.get(id)
    if detect:
        await detect.update(update_query)
        return detect
    return False

from flask import Flask, request, jsonify
from pydantic import BaseModel, ValidationError
from typing import List, Union

app = Flask(__name__)

class Info(BaseModel):
    description: str
    url: str
    version: str
    year: int
    contributor: str
    date_created: str

class License(BaseModel):
    url: str
    id: int
    name: str

class Image(BaseModel):
    license: int
    file_name: str
    coco_url: str
    height: int
    width: int
    date_captured: str
    flickr_url: str
    id: int

class Annotation(BaseModel):
    segmentation: List[Union[List[float], List[List[float]]]]  # segmentation can be nested lists
    area: float
    iscrowd: int
    image_id: int
    bbox: List[float]
    category_id: int
    id: int

class Category(BaseModel):
    supercategory: str
    id: int
    name: str

class COCOSchema(BaseModel):
    info: Info
    licenses: List[License]
    images: List[Image]
    annotations: List[Annotation]
    categories: List[Category]

@app.route("/validate", methods=["POST"])
def validate_coco():
    payload = request.get_json()
    if not payload:
        return jsonify({"error": "No JSON payload provided"}), 400
    
    try:
        COCOSchema(**payload)
        return jsonify({"message": "Success"}), 200
    except ValidationError as e:
        return jsonify({"error": "Validation error", "details": e.errors()}), 422

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5002)

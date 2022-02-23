from flask import Blueprint, request
from app.models import db, Map, Feature, FeatureType

feature_routes = Blueprint('features', __name__)

@feature_routes.route('/<int:id>/')
def feature_by_id(id):
    return Feature.get_feature(id)

@feature_routes.route('/<int:id>/', methods=['PUT'])
def update_feature(id):
    request_body = request.json
    print(request_body)
    updated_feature = Feature.update_feature(
        id = id,
        map_id = request_body['mapId'],
        feature_type_id= request_body['featureTypeId'],
        start_latitude= request_body['startLatitude'],
        stop_latitude= request_body['stopLatitude'],
        start_longitude= request_body['startLongitude'],
        stop_longitude= request_body['stopLongitude']
    )

    return updated_feature.to_dict()

@feature_routes.route('/<int:id>/', methods=['DELETE'])
def delete_map(id):
    Feature.delete_feature(id)
    return {'message': f'feature {id} deleted successfully'}

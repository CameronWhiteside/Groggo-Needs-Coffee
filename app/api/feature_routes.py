from flask import Blueprint, request
from app.models import db, Map, Feature, FeatureType

feature_routes = Blueprint('features', __name__)

@feature_routes.route('/<int:id>/')
def feature_by_id(id):
    return Feature.get_feature(id)

@feature_routes.route('/<int:id>/', methods=['PUT'])
def update_feature(id):
    request_body = request.json
    updated_feature = Feature.update_feature(
        id = id,
        map_id = request_body['map_id'],
        feature_type_id= request_body['feature_type_id'],
        start_latitude= request_body['start_latitude'],
        stop_latitude= request_body['stop_latitude'],
        start_longitude= request_body['start_longitude'],
        stop_longitude= request_body['stop_longitude']
    )

    return updated_feature.to_dict()

@feature_routes.route('/<int:id>/', methods=['DELETE'])
def delete_map(id):
    Feature.delete_feature(id)
    return {'message': f'feature {id} deleted successfully'}

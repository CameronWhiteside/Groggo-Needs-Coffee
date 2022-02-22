from flask import Blueprint, request
from app.models import db, Map, Feature, FeatureType
from flask_login import login_required

map_routes = Blueprint('maps', __name__)

@map_routes.route('/<int:id>/')
@login_required
def map_by_id(id):
    return Map.get_map_by_id(id)

@map_routes.route('/<int:id>/features/')
@login_required
def map_features(id):
    feature_list = Feature.get_map_features(id)
    return {'features': feature_list}

@map_routes.route('/<int:id>/features/', methods=['POST'])
@login_required
def new_features(id):
    request_body = request.json

    new_feature = Feature.add_a_feature(
        map_id = id,
        feature_type_id= request_body['feature_type_id'],
        start_latitude= request_body['start_latitude'],
        stop_latitude= request_body['stop_latitude'],
        start_longitude= request_body['start_longitude'],
        stop_longitude= request_body['stop_longitude']
    )
    return {'feature': new_feature.to_dict()}

@map_routes.route('/<int:id>/features/', methods=['DELETE'])
@login_required
def delete_all_features(id):
    Map.clear_map(id)
    return {'message': f'map {id} cleared successfully'}


@map_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def update_map(id):
    updated_map = Map.get_map_by_id(id)
    request_body = request.json
    name = request_body['name']
    # feature_list = request_body['features']
    Map.update_map(id, name)
    return updated_map

@map_routes.route('/<int:id>/', methods=['DELETE'])
def delete_map(id):
    Map.delete_map(id)
    return {'message': f'map {id} deleted successfully'}

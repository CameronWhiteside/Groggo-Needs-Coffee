from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Map

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/maps/')
@login_required
def user_maps(id):
    return {'maps': Map.get_user_maps(id)}


@user_routes.route('/<int:id>/maps/', methods=['POST'])
@login_required
def add_map(id):
    request_body = request.json
    print('~~~~~~~~~~~~~', request_body)
    new_map = Map.create_new_map(
        user_id = id,
        name = request_body['name'],
        feature_list=request_body['featureList']
        )
    return new_map.to_dict()

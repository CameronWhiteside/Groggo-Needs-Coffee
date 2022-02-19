from .db import db
from .user import User
from .feature import Feature
from sqlalchemy.sql import func

class Map(db.Model):
  __tablename__ = 'maps'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
  updated_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)

  owner = db.relationship('User', back_populates = 'maps')
  features = db.relationship('Feature', back_populates ='map', cascade='all, delete')


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'owner_id': self.owner_id,
      'owner_username': User.query.filter(User.id == self.owner_id).first().username,
      'features': Feature.get_map_features(self.id),
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

  def create_new_map(user_id, name, feature_list = []):
      new_map = Map(
          name = name,
          owner_id = user_id,
          created_at = func.now(),
          updated_at = func.now()
      )
      db.session.add(new_map)
      db.session.commit()
      db.session.refresh(new_map)
      map_id = new_map.id
      for feature in feature_list:
        Feature.add_a_feature(
            map_id = map_id,
            feature_type_id = feature['typeId'],
            start_latitude = feature['startLatitude'],
            start_longitude = feature['startLongitude'],
            stop_latitude = feature ['stopLatitude'],
            stop_longitude = feature ['stopLongitude']
        )
      return new_map

  def get_user_maps(user_id):
      all_maps = Map.query.filter(Map.owner_id == user_id).all()
      map_list = [map.to_dict() for map in all_maps]
      return map_list

  def get_map_by_id(id):
      found_map = Map.query.get(id)
      return found_map.to_dict()

  def update_map(id, name, feature_list=[]):
      edited_map = Map.query.filter(Map.id == id).first()
      edited_map.name = name
      edited_map.updated_at = func.now()
      old_feature_list = Feature.query.filter(Feature.map_id == id).all()
      for feature in old_feature_list:
        db.session.delete(feature)
      for feature in feature_list:
        Feature.add_a_feature(
            map_id = id,
            feature_type_id = feature['typeId'],
            start_latitude = feature['startLatitude'],
            start_longitude = feature['startLongitude'],
            stop_latitude = feature ['stopLatitude'],
            stop_longitude = feature ['stopLongitude']
        )
      db.session.commit()
      return edited_map

  def delete_map(id):
      deleted_map = Map.query.filter(Map.id == id).first()
      db.session.delete(deleted_map)
      db.session.commit()
      return {'message': 'map deleted'}

  def clear_map(map_id):
      all_features = Feature.query.filter(Feature.map_id == map_id).all()
      for feature in all_features:
        feature.delete()
      db.session.commit()

from .db import db
from .feature_type import FeatureType
from sqlalchemy.sql import func

class Feature(db.Model):
  __tablename__ = 'features'

  id = db.Column(db.Integer, primary_key=True)
  start_latitude = db.Column(db.Integer, nullable=False)
  start_longitude = db.Column(db.Integer, nullable=False)
  stop_latitude = db.Column(db.Integer, nullable=False)
  stop_longitude = db.Column(db.Integer, nullable=False)
  feature_type_id = db.Column(db.Integer, db.ForeignKey('feature_types.id'), nullable=False)
  map_id = db.Column(db.Integer, db.ForeignKey('maps.id'), nullable=False)


  map = db.relationship('Map', back_populates ='features')

  def to_dict(self):
    return {
      'id': self.id,
      'start_latitude': self.start_latitude,
      'stop_latitude': self.stop_latitude,
      'start_longitude': self.start_longitude,
      'stop_longitude': self.stop_longitude,
      'length': ((self.stop_latitude - self.start_latitude) ** 2 + (self.stop_longitude - self.start_longitude) **2 ) ** 0.5,
      'feature_type_id': self.feature_type_id,
      'type_name': FeatureType.query.filter(FeatureType.id == self.feature_type_id).first().type_name,
    }

  def add_a_feature(
    map_id,
    feature_type_id,
    start_latitude,
    start_longitude,
    stop_latitude,
    stop_longitude):

    new_feature = Feature(
          map_id = map_id,
          feature_type_id = feature_type_id,
          start_latitude = start_latitude,
          start_longitude = start_longitude,
          stop_latitude = stop_latitude,
          stop_longitude = stop_longitude,
    )

    db.session.add(new_feature)
    db.session.commit()
    return new_feature

  def get_map_features(map_id):
      map_features = Feature.query.filter(Feature.map_id == map_id).all()
      return [feature.to_dict() for feature in map_features]

  def get_feature(id):
      found_feature = Feature.query.get(id)
      return found_feature.to_dict()

  def update_feature(
    id,
    map_id,
    feature_type_id,
    start_latitude,
    start_longitude,
    stop_latitude,
    stop_longitude
  ):
    updated_feature = Feature.get_feature(id)
    updated_feature.map_id = map_id,
    updated_feature.feature_type_id = feature_type_id
    updated_feature.start_latitude = start_latitude
    updated_feature.stop_latitude = stop_latitude
    updated_feature.start_longitude = start_longitude
    updated_feature.stop_longitude = stop_longitude
    db.session.commit()
    return updated_feature.to_dict()


  def update_feature_start(id, latitude, longitude):
      edited_feature = Feature.query.filter(Feature.id == id).first()
      edited_feature.start_latitude = latitude
      edited_feature.start_longitude = longitude
      db.session.commit()
      return edited_feature.to_dict()

  def update_feature_stop(id, latitude, longitude):
      edited_feature = Feature.query.filter(Feature.id == id).first()
      edited_feature.stop_latitude = latitude
      edited_feature.stop_longitude = longitude
      db.session.commit()
      return edited_feature.to_dict()

  def delete_feature(id):
      deleted_feature = Feature.query.filter(Feature.id == id).first()
      deleted_feature.delete()
      db.session.commit()

from .db import db, FeatureTypes
from sqlalchemy.sql import func

class Features(db.Model):
  __tablename__ = 'features'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.Numeric, nullable=False)
  start_latitude = db.Column(db.Integer, nullable=False)
  start_longitude = db.Column(db.Integer, nullable=False)
  stop_latitude = db.Column(db.Integer, nullable=False)
  stop_longitude = db.Column(db.Integer, nullable=False)
  feature_type_id = db.Column(db.Integer, db.ForeignKey('feature_types.id'), nullable=False)
  map_id = db.Column(db.Integer, db.ForeignKey('maps.id'), nullable=False)


  map_owner = db.relationship('Maps', foreign_keys=[map_id])

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'start_latitude': self.start_latitude,
      'stop_latitude': self.stop_latitude,
      'start_longitude': self.start_longitude,
      'stop_longitude': self.stop_longitude,
      'length': ((self.stop_latitude - self.start_latitude) ** 2 + (self.stop_longitude - self.start_longitude) **2 ) ** 0.5,
      'feature_type_id': self.feature_type_id,
      'type': FeatureTypes.query.filter(FeatureTypes.id == self.feature_type_id).first().type,
      'travel_speed':  FeatureTypes.query.filter(FeatureTypes.id == self.feature_type_id).first().travel_speed,
      'travel_duration': ((self.stop_latitude - self.start_latitude) ** 2 + (self.stop_longitude - self.start_longitude) **2 ) ** 0.5/FeatureTypes.query.filter(FeatureTypes.id == self.feature_type_id).first().travel_speed
    }

  def add_a_feature(
    name,
    map_id,
    feature_type_id,
    start_latitude,
    start_longitude,
    stop_latitude,
    stop_longitude):

    new_feature = Features(
          name = name,
          map_id = map_id,
          feature_type_id = feature_type_id,
          start_latitude = start_latitude,
          start_longitude = start_longitude,
          stop_latitude = stop_latitude,
          stop_longitude = stop_longitude,
    )

    db.session.add(new_feature)
    db.session.commit()

  def get_map_features(map_id):
      return Features.query.filter(Features.map_id == map_id).all()

  def update_feature_start(id, latitude, longitude):
      edited_feature = Features.query.filter(Features.id == id).first()
      edited_feature.start_latitude = latitude
      edited_feature.start_longitude = longitude
      db.session.commit()

  def update_feature_stop(id, latitude, longitude):
      edited_feature = Features.query.filter(Features.id == id).first()
      edited_feature.stop_latitude = latitude
      edited_feature.stop_longitude = longitude
      db.session.commit()

  def delete_feauture(id):
      deleted_feature = Features.query.filter(Features.id == id).first()
      deleted_feature.delete()
      db.session.commit()

  def clear_map(map_id):
      all_features = Features.query.filter(Features.map_id == map_id).all()
      for feature in all_features:
        feature.delete()
      db.session.commit()

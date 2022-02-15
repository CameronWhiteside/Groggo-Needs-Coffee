from .db import db

class FeatureType(db.Model):
  __tablename__ = 'feature_types'

  id = db.Column(db.Integer, primary_key=True)
  type_name = db.Column(db.String, nullable=False, unique=True)
  travel_speed = db.Column(db.DECIMAL, nullable=False)
  minimum_per_map = db.Column(db.Integer)
  maximum_per_map = db.Column(db.Integer)
  is_crossable = db.Column(db.Boolean)
  is_origin_feature = db.Column(db.Boolean)
  is_destination_feature = db.Column(db.Boolean)

  def to_dict(self):
    return {
      'id': self.id,
      'type_name': self.type_name,
      'travel_speed': self.travel_speed,
      'minimum_per_map': self.minimum_per_map,
      'maximum_per_map': self.minimum_per_map,
      'is_crossable': self.is_crossable,
      'is_origin_feature': self.is_origin_feature,
      'is_destination_feature': self.is_destination_feature
    }

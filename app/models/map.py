from .db import db, Users
from sqlalchemy.sql import func

class Maps(db.Model):
  __tablename__ = 'maps'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.Numeric, nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
  updated_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)

  owner = db.relationship('User', foreign_keys=[owner_id])


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'owner_id': self.owner_id,
      'owner_username': Users.query.filter(Users.id == self.owner_id).first().username,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

  def create_new_map(user_id, name):
      new_map = Maps(
          name = name,
          owner_id = user_id,
          created_at = func.now(),
          updated_at = func.now()
      )
      db.session.add(new_map)
      db.session.commit()

  def get_user_maps(user_id):
      return Maps.query.filter(Maps.owner_id == user_id).all()

  def update_map_name(id, name):
      edited_map = Maps.query.filter(Maps.id == id).first()
      edited_map.name = name
      edited_map.updated_at = func.now()
      db.session.commit()

  def delete_map(id):
      deleted_map = Maps.query.filter(Maps.id == id).first()
      deleted_map.delete()
      db.session.commit()

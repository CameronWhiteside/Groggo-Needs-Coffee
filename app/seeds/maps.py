from app.models import db, Map
from sqlalchemy.sql import func

def seed_maps():

    first_map = Map(
        name = 'My First Map',
        owner_id = 1,
    )

    second_map = Map(
        name = 'My Second Map',
        owner_id = 1,
    )

    db.session.add(first_map)
    db.session.add(second_map)
    db.session.commit()

def undo_maps():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

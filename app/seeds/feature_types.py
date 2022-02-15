from app.models import db, FeatureType
from sqlalchemy.sql import func

def seed_feature_types():

    home = FeatureType(
        type_name = 'home',
        travel_speed = 1000,
        minimum_per_map = 1,
        maximum_per_map = 1,
        is_crossable = True,
        is_origin_feature = True,
        is_destination_feature = False
    )

    shop = FeatureType(
        type_name = 'shop',
        travel_speed = 1000,
        minimum_per_map = 1,
        maximum_per_map = 1,
        is_crossable = True,
        is_origin_feature = False,
        is_destination_feature = True
    )

    highway = FeatureType(
        type_name = 'highway',
        travel_speed = 60,
        is_crossable = False,
        is_origin_feature = False,
        is_destination_feature = False
    )

    street = FeatureType(
        type_name = 'street',
        travel_speed = 30,
        is_crossable = True,
        is_origin_feature = False,
        is_destination_feature = False
    )

    alley = FeatureType(
        type_name = 'alley',
        travel_speed = 5,
        is_crossable = True,
        is_origin_feature = False,
        is_destination_feature = False
    )

    brush = FeatureType(
        type_name = 'brush',
        travel_speed = 0.25,
        is_crossable = True,
        is_origin_feature = False,
        is_destination_feature = False
    )

    river = FeatureType(
        type_name = 'river',
        travel_speed = 0,
        is_crossable = False,
        is_origin_feature = False,
        is_destination_feature = False
    )


    db.session.add(home)
    db.session.add(shop)
    db.session.add(highway)
    db.session.add(street)
    db.session.add(alley)
    db.session.add(brush)
    db.session.add(river)
    db.session.commit()

def undo_feature_types():
    db.session.execute('TRUNCATE feature_types RESTART IDENTITY CASCADE;')
    db.session.commit()

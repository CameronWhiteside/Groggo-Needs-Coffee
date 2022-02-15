from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    
    demo = User(
        username='demo', email='demo@demo.com', password='password')
    admin = User(
        username='admin', email='admin@admin.com', password='password')

    db.session.add(demo)
    db.session.add(admin)
    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

from db import db
from sqlalchemy import Enum

# Define role constants
FOREST_OWNER_ROLE = 'Forest Owner'
BOTANICAL_OWNER_ROLE = 'Botanical Owner'

# Define subscription constants
FREE_SUBSCRIPTION = 'Free'
PREMIUM_SUBSCRIPTION = 'Premium'

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    subscription_type = db.Column(Enum(FREE_SUBSCRIPTION, PREMIUM_SUBSCRIPTION, name='subscription_types'), nullable=False)
    role = db.Column(Enum(FOREST_OWNER_ROLE, BOTANICAL_OWNER_ROLE, name='user_roles'), nullable=False)

class ForestOwner(db.Model):
    owner_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    owner_name = db.Column(db.String(100), nullable=False)
    contact_number = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    forest = db.relationship('Forest', backref='owner', uselist=False)

class Forest(db.Model):
    forest_id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('forest_owner.owner_id'), nullable=False)
    forest_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    soil_type = db.Column(db.String(50), nullable=False)

class BotanicalOwner(db.Model):
    botanical_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    owner_name = db.Column(db.String(100), nullable=False)
    botanical_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    contact_number = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(200), nullable=True)

from db import db
    
class Tender(db.Model):
    tender_id = db.Column(db.Integer, primary_key=True)
    forest_owner_id = db.Column(db.Integer, db.ForeignKey('forest_owner.owner_id'), nullable=False)
    tender_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.Date, nullable=False)
    
class TenderApplication(db.Model):
    application_id = db.Column(db.Integer, primary_key=True)
    botanical_id = db.Column(db.Integer, db.ForeignKey('botanical_owner.botanical_id'), nullable=False)
    tender_id = db.Column(db.Integer, db.ForeignKey('tender.tender_id'), nullable=False)
    application_date = db.Column(db.Date, nullable=False)

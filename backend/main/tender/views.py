from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from .models import Tender
from main.auth.models import User,ForestOwner
from flask import request
from datetime import datetime
from db import db
# from flasgger import swag_from

def forest_owner_required(fn):
    @jwt_required()
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        current_username = get_jwt_identity()
        current_user = User.query.filter_by(username=current_username).first()
        
        if current_user.role != 'Forest Owner':
            return {'message': 'Access forbidden. Forest Owner role required.'}, 403
        forest_owner_obj = ForestOwner.query.filter_by(user_id=current_user.user_id).first()
        if not forest_owner_obj:
            return {'message': 'Forest owner information not found.'}, 404
        forest_owner_id = forest_owner_obj.owner_id
        return fn(forest_owner_id, *args, **kwargs)
    return wrapper


class TenderResource(Resource):
    @jwt_required()
    # @swag_from('swagger_doc/get_tender.yml')
    def get(self, tender_id=None):
        if tender_id:
            tender = Tender.query.get(tender_id)
            if tender:
                return {
                    'tender_id': tender.tender_id,
                    'forest_owner_id': tender.forest_owner_id,
                    'tender_type': tender.tender_type,
                    'description': tender.description,
                    'date_posted': str(tender.date_posted)
                }
            return {'message': 'Tender not found'}, 404
        else:
            tenders = Tender.query.all()
            tender_list = []
            for tender in tenders:
                tender_list.append({
                    'tender_id': tender.tender_id,
                    'forest_owner_id': tender.forest_owner_id,
                    'tender_type': tender.tender_type,
                    'description': tender.description,
                    'date_posted': str(tender.date_posted)
                })
            return tender_list

    @forest_owner_required
    # @swag_from('swagger_doc/post_tender.yml')
    def post(self,forest_owner_id):
        data = request.get_json()
        new_tender = Tender(
            forest_owner_id=forest_owner_id,
            tender_type=data['tender_type'],
            description=data['description'],
            date_posted=datetime.strptime(data['date_posted'], '%Y-%m-%d')
        )
        db.session.add(new_tender)
        db.session.commit()
        return {'message': 'Tender created successfully'}, 201

    @forest_owner_required
    # @swag_from('swagger_doc/put_tender.yml')
    def put(self, tender_id):
        tender = Tender.query.get(tender_id)
        if not tender:
            return {'message': 'Tender not found'}, 404

        data = request.get_json()
        tender.forest_id = data['forest_id']
        tender.tender_type = data['tender_type']
        tender.description = data['description']
        tender.date_posted = datetime.strptime(data['date_posted'], '%Y-%m-%d')

        db.session.commit()
        return {'message': 'Tender updated successfully'}

    @forest_owner_required
    # @swag_from('swagger_doc/delete_tender.yml')
    def delete(self, tender_id):
        tender = Tender.query.get(tender_id)
        if tender:
            db.session.delete(tender)
            db.session.commit()
            return {'message': 'Tender deleted successfully'}
        return {'message': 'Tender not found'}, 404
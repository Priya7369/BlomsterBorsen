from flask_restful import Resource
from .serializers import CombinedForestOwnerDataSchema,CombinedBotanicalOwnerDataSchema
from flask import request
from db import db,bcrypt
from .models import User,Forest,ForestOwner,BotanicalOwner
from flasgger import swag_from
from flask_jwt_extended import create_access_token,create_refresh_token
import logging

combined_forest_owner_data_schema = CombinedForestOwnerDataSchema()
combined_botanical_owner_data_schema = CombinedBotanicalOwnerDataSchema()


class ForestOwnerResource(Resource):
    """
    ForestOwnerResource API.

    This resource handles the creation of ForestOwner and Forest instances.
    """

    @swag_from({
        'tags': ['ForestOwner'],
        'description': 'Create a new ForestOwner and associated Forest.',
        'parameters': [
            {
                'name': 'data',
                'description': 'JSON data for creating ForestOwner and Forest.',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'username': {'type': 'string', 'maxLength': 50, 'minLength': 1},
                        'password': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        'email': {'type': 'string', 'format': 'email', 'maxLength': 100, 'minLength': 1},
                        'role': {'type': 'string', 'enum': ['Forest Owner', 'Botanical Owner']},
                        'subscription_type': {'type': 'string', 'enum': ['Free', 'Premium']},
                        'owner_name': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        'contact_number': {'type': 'string', 'maxLength': 20},
                        'address': {'type': 'string', 'maxLength': 200},
                        'forest_name': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        'location': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        'soil_type': {'type': 'string', 'maxLength': 50, 'minLength': 1},
                    },
                    'required': ['username', 'password', 'email', 'role', 'subscription_type', 'owner_name', 'forest_name', 'location', 'soil_type'],
                },
            },
        ],
        'responses': {
            '201': {
                'description': 'ForestOwner and Forest created successfully.',
            },
            '400': {
                'description': 'Validation error in the input data.',
            },
            '500': {
                'description': 'Internal server error.',
            },
        },
    })
    def post(self):
        data = request.json

        # Validate the incoming data
        errors = combined_forest_owner_data_schema.validate(data)
        if errors:
            return {"error": errors}, 400

        # Extract data for creating User, ForestOwner, and Forest
        user_data = {key: data[key] for key in ['username', 'password', 'email', 'role', 'subscription_type']}
        owner_data = {key: data[key] for key in ['owner_name', 'contact_number', 'address']}
        forest_data = {key: data[key] for key in ['forest_name', 'location', 'soil_type']}

        # Create User
        user_data['password'] = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(**user_data)
        db.session.add(new_user)
        db.session.flush()  # Flush to get the auto-generated user_id

        # Create ForestOwner
        new_forest_owner = ForestOwner(user_id=new_user.user_id, **owner_data)
        db.session.add(new_forest_owner)

        db.session.commit()
        
        # Create Forest
        new_forest = Forest(owner_id=new_forest_owner.owner_id, **forest_data)
        db.session.add(new_forest)
        
        try:
            try:
                db.session.commit()
            except Exception as e:
                print(str(e))
                return {"error": str(e)}, 500
            return {"message": "ForestOwner and Forest created successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
        finally:
            db.session.close()
            
class BotanicalOwnerResource(Resource):
    """
    ForestOwnerResource API.

    This resource handles the creation of ForestOwner and Forest instances.
    """

    @swag_from({
        'tags': ['BotanicalOwner'],
        'description': 'Create a new BotanicalOwner.',
        'parameters': [
            {
                'name': 'data',
                'description': 'JSON data for creating BotanicalOwner.',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'username': {'type': 'string', 'maxLength': 50, 'minLength': 1},
                        'password': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        'email': {'type': 'string', 'format': 'email', 'maxLength': 100, 'minLength': 1},
                        'role': {'type': 'string', 'enum': ['Forest Owner', 'Botanical Owner']},
                        'subscription_type': {'type': 'string', 'enum': ['Free', 'Premium']},
                        'owner_name': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        'contact_number': {'type': 'string', 'maxLength': 20},
                        'address': {'type': 'string', 'maxLength': 200},
                        'botanical_name': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        'location': {'type': 'string', 'maxLength': 100, 'minLength': 1},
                        
                    },
                    'required': ['username', 'password', 'email', 'role', 'subscription_type', 'owner_name', 'botanical_name', 'location'],
                },
            },
        ],
        'responses': {
            '201': {
                'description': 'BotanicalOwner created successfully.',
            },
            '400': {
                'description': 'Validation error in the input data.',
            },
            '500': {
                'description': 'Internal server error.',
            },
        },
    })
    def post(self):
        logging.info('Received POST request for /api/forest_owner')
        data = request.json

        # Validate the incoming data
        errors = combined_botanical_owner_data_schema.validate(data)
        if errors:
            return {"error": errors}, 400

        # Extract data for creating User, ForestOwner, and Forest
        user_data = {key: data[key] for key in ['username', 'password', 'email', 'role', 'subscription_type']}
        owner_data = {key: data[key] for key in ['owner_name', 'contact_number', 'address','botanical_name', 'location']}

        # Create User
        user_data['password'] = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(**user_data)
        db.session.add(new_user)
        db.session.flush()  # Flush to get the auto-generated user_id

        # Create ForestOwner
        new_botanical_owner = BotanicalOwner(user_id=new_user.user_id, **owner_data)
        db.session.add(new_botanical_owner)

        db.session.commit()
        
        try:
            try:
                db.session.commit()
            except Exception as e:
                print(str(e))
                logging.exception('An exception occurred: %s', str(e))
                return {"error": str(e)}, 500
            return {"message": "BotanicalOwner created successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
        finally:
            db.session.close()
            
class LoginResource(Resource):
    @swag_from({
        'tags': ['Authentication'],
        'description': 'User login API',
        'parameters': [
            {
                'name': 'data',
                'description': 'JSON data for user login.',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'username': {'type': 'string', 'minLength': 1},
                        'password': {'type': 'string', 'minLength': 1},
                    },
                    'required': ['username', 'password'],
                },
            },
        ],
        'responses': {
            '200': {
                'description': 'Login successful',
                'schema': {
                    'type': 'object',
                    'properties': {
                        'access_token': {'type': 'string'},
                        'refresh_token': {'type': 'string'},
                        'username': {'type': 'string'},
                        'role': {'type': 'string'},
                        'message': {'type': 'string'},
                    },
                },
            },
            '401': {
                'description': 'Invalid username or password',
                'schema': {
                    'type': 'object',
                    'properties': {
                        'message': {'type': 'string'},
                    },
                },
            },
        },
    })
    def post(self):
        data = request.get_json()
        username = data.get('username', None)
        password = data.get('password', None)

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=username, additional_claims={'role': user.role})
            refresh_token = create_refresh_token(identity=username)

            return {
                'access_token': access_token,
                'refresh_token': refresh_token,
                'username': username,
                'role': user.role,
                'message': 'Login successful'
            }, 200
        else:
            return {'message': 'Invalid username or password'}, 401
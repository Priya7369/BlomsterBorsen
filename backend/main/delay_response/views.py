import time
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask import jsonify,request

class DelayedResponseResource(Resource):
    @jwt_required() 
    def get(self):

        delay = request.args.get('delay', default=3, type=int)
        time.sleep(delay)

        response_data = {'message': f'Response delayed by {delay} seconds'}
        return jsonify(response_data)

from flask import Flask,request,make_response
from flask_restful import Api
from flasgger import Swagger
import secrets
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from main.auth.urls import auth_urls
from main.tender.urls import tender_urls
from main.delay_response.urls import delay_urls
from db import db
import logging

# Configure logging
logging.basicConfig(filename='api.log', level=logging.DEBUG)

jwt_secret_key = secrets.token_hex(32)

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

# Enable CORS for all routes
CORS(app, origins=["http://localhost:3000"])


# Your database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/trail'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = jwt_secret_key
jwt = JWTManager(app)

# Initialize SQLAlchemy with the Flask app
db.init_app(app)

# Global CORS handling for preflight requests
@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
        return response

migrate = Migrate(app, db)

if __name__ == '__main__':
    with app.app_context():
        
        try:
            # Create the database tables
            db.create_all()
            print("Tables created successfully.")
        except Exception as e:
            print(f"Error creating tables: {e}")
            
        # Register API endpoints
        auth_urls(api)
        tender_urls(api)
        delay_urls(api)

    # Run the Flask application in debug mode
    app.run(debug=True)


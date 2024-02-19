## Create VirtualEnv

    python -m venv venv

## Activate virtualenv

    venv\Scripts\activate

pip install -r requirements.txt

chmod +x manage_database.sh

## To Create Database

    ./manage_database.sh create

## To Drop Database

    ./manage_database.sh drop

## For Api's Documenatation

    http://127.0.0.1:5000/apidocs/

## Start the project

    flask db init

    flask db migrate -m "first migrate"

    flask db upgrade

    python app.py

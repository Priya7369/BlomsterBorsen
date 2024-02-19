python deleteMigrationsPycache.py

echo "Do you want to drop and create the database? (y/n)"
read confirm

if [ "$confirm" == "y" ]; then
    ./manage_database.sh drop

    ./manage_database.sh create

    echo "Database dropped and created successfully."
else
    echo "Database drop and create operation canceled."
fi

flask db init

flask db migrate -m "first migrate"

flask db upgrade

python app.py
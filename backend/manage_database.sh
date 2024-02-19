#!/bin/bash

# Set your PostgreSQL database credentials
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="trail"

# Function to create the database
create_database() {
    echo "Creating database $DB_NAME..."
    createdb -U $DB_USER -h localhost -W $DB_NAME
    echo "Database $DB_NAME created successfully."
}

# Function to drop the database
drop_database() {
    echo "Dropping database $DB_NAME..."
    dropdb -U $DB_USER -h localhost -W $DB_NAME
    echo "Database $DB_NAME dropped successfully."
}

# Main script
if [ "$1" == "create" ]; then
    create_database
elif [ "$1" == "drop" ]; then
    drop_database
else
    echo "Usage: $0 {create|drop}"
    exit 1
fi

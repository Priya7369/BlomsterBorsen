#!/bin/bash

# PostgreSQL database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="trail"
DB_USER="postgres"
DB_PASSWORD="postgres"

# Run psql command to list all tables in the specified database
tables=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "\dt" -t)

# Check if there are tables and print the result
if [ -n "$tables" ]; then
    echo "Tables in database '$DB_NAME':"
    echo "$tables"
else
    echo "No tables found in database '$DB_NAME'."
fi

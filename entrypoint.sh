#!/bin/sh

# Wait for MySQL database to become ready
echo "Waiting for MySQL..."
while ! nc -z mysql-db 3306; do
  sleep 1
done
echo "MySQL is ready."

# Run Sequelize migrations
echo "Running Flights Service migrations..."
npx sequelize db:migrate

# Start the Flights service
echo "Starting Flights Service..."
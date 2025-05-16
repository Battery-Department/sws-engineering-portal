#!/bin/bash

# Create data directory and initialize SQLite database for production
mkdir -p data
touch data/lithi.db

# Initialize the database with the schema
npx prisma db push --accept-data-loss

echo "Database setup complete!"
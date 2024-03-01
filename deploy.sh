#!/bin/bash

# Clone the repository and rename it to dailyTrends
git clone https://github.com/RafaelOrti/scraping_muchosol dailyTrends

# Navigate into the dailyTrends folder
cd dailyTrends || exit

# Copy .env.example to .env
cp .env.example .env

# Go back to the root directory of the project
cd ..

# Run docker-compose
docker-compose up -d

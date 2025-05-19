#!/bin/bash

# Create a test customer account
curl -X POST https://battery-dashboard-5ysf46g6g-battery-departments-projects.vercel.app/api/customer/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@lithi.com",
    "password": "TestPassword123!",
    "name": "Test Customer"
  }'
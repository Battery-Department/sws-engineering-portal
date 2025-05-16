#!/bin/bash

echo "Testing Battery Dashboard Application..."
echo "========================================"

# Test home page
echo "Testing home page..."
curl -s http://localhost:3000 | grep -q "Battery Department Portal" && echo "✓ Home page loads correctly" || echo "✗ Home page error"

# Test login page
echo "Testing login page..."
curl -s http://localhost:3000/portal/auth/login | grep -q "Welcome back" && echo "✓ Login page loads correctly" || echo "✗ Login page error"

# Check for demo credentials
curl -s http://localhost:3000/portal/auth/login | grep -q "demo@example.com" && echo "✓ Demo credentials displayed" || echo "✗ Demo credentials missing"

echo "========================================"
echo "Test complete!"
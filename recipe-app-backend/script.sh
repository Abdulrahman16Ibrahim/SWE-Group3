#!/usr/bin/env bash
#
# A simple script to set up and run Meal Planner backend.
# This script does:
#   1. Installs NPM dependencies
#   2. Helps you to set up the MySQL DB and run SQL scripts
#   3. Starts the server via 'npm start'

# --- 1. Install NPM Dependencies ---
echo "Installing dependencies..."
npm install

# --- 2.  Run Your SQL Script ---
echo ""
echo "========================================================="
echo "If you have NOT yet created the MySQL database/tables:"
echo "  1) Make sure MySQL is running."
echo "  2) In another terminal, run something like:"
echo "       mysql -u <DB_USERNAME> -p < sql_scripts/init_tables.sql"
echo "     (or use MySQL Workbench to execute init_tables.sql)."
echo "========================================================="
echo ""
read -p "Press [Enter] once you've ensured the DB is ready..."

# --- 3. Start the Server ---
echo ""
echo "Starting the Node.js server..."
npm start

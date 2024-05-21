# taskmanager
Project Setup Guide

This guide will walk you through setting up the frontend and backend of the project.

Frontend Setup

Prerequisites

Node.js installed on your machine
version 21.7.2
Installation

Open a terminal and navigate to the "frontend" directory of the project.
Run the command: cd frontend
Install dependencies using npm.
Run the command: npm install
Development

To run the frontend in development mode:

npm run dev

This command will start the development server, and you can access the frontend at http://localhost:3000.

Backend Setup

Prerequisites

PHP and Composer installed on your machine
MySQL server running locally
Installation

Open a terminal and navigate to the "backendcode" directory of the project.
Run the command: cd backendcode
Install PHP dependencies using Composer.
Run the command: composer install
Run database migrations to create the necessary tables.
Run the command: php artisan migrate
(Optional) Seed the database with sample data.
Run the command: php artisan db:seed
Running the Server

To start the backend server:

php artisan serve

The backend will be accessible at (http://127.0.0.1:8000)

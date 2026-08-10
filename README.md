# Password Strength Analyzer

## Project Description

Password Strength Analyzer is a web-based application developed to evaluate the strength and security of user-entered passwords.

The application checks password length, complexity, common-password usage, and provides security suggestions.

It also includes password history checking using a SQLite database and password hashing.

## Features

- Password strength analysis
- Password length checking
- Uppercase letter checking
- Lowercase letter checking
- Number checking
- Special character checking
- Common password detection
- Security suggestions
- Show/Hide password
- Password history checking
- SHA-256 password hashing
- SQLite database
- Secure password generation
- Colorful responsive user interface

## Technologies Used

- HTML
- CSS
- JavaScript
- Python
- Flask
- SQLite
- SHA-256 Hashing

## Project Structure

Password_Strength_Analyzer/

├── app.py  
├── password_history.py  
├── requirements.txt  
├── README.md  
├── .gitignore  
│  
├── templates/  
│   └── index.html  
│  
├── static/  
│   ├── style.css  
│   └── script.js  
│  
└── venv/

## How to Run

### 1. Create virtual environment

python -m venv venv

### 2. Activate virtual environment

Windows PowerShell:

venv\Scripts\Activate.ps1

### 3. Install dependencies

python -m pip install -r requirements.txt

### 4. Run the application

python app.py

### 5. Open in browser

http://127.0.0.1:5000

## Password Security

The application does not store passwords in plain text.

Passwords are converted into SHA-256 hashes before being stored in the password history database.

## Learning Outcome

This project provides practical understanding of:

- Password security
- Password strength evaluation
- Hashing
- SQLite database usage
- Flask web development
- Client-server communication
- Basic cryptography concepts
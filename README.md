Django OTP-Based Email Verification API
A Django-based user authentication system that includes email verification via OTP (One-Time Password). This project allows users to register, request an OTP, and verify their account via email before logging in.

Table of Contents
Features
Project Structure
Technologies Used
Setup Instructions
API Endpoints
Testing
Contact Information
Features
User Registration: New users can register with their email.
OTP Generation and Email Verification: An OTP is sent to the user's email for verification.
JWT Authentication: Users can log in and receive a JWT token for secured access after email verification.
Error Handling: Proper error messages for invalid OTPs, expired OTPs, and failed requests.
Project Structure
markdown
Copy code
authentication/
│
├── authorize/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── authentication/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
└── templates/
    └── email_verification.html
Technologies Used
Django (Backend framework)
Django REST Framework (API development)
JWT (JSON Web Token for secure authentication)
PostgreSQL (Database)
SMTP (Gmail SMTP for sending emails)
Setup Instructions
Prerequisites
Make sure you have the following installed:

Python 3.8+
pip (Python package manager)
PostgreSQL (or any other database)
Step-by-Step Guide
Clone the repository:

bash
Copy code
git clone https://github.com/Manthan-Khamkar/Django-OTP-Email-Verification.git
cd Django-OTP-Email-Verification
Create a virtual environment and activate it:

bash
Copy code
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
Install the dependencies:

bash
Copy code
pip install -r requirements.txt
Configure SMTP settings for email verification:

Open the settings.py file and update the following with your Gmail credentials:

python
Copy code
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-specific-password'
Note: For security, it's best to use an App Password instead of your main Gmail password.

Apply the migrations and start the server:

bash
Copy code
python manage.py migrate
python manage.py runserver
Access the project locally: Open your browser and go to http://127.0.0.1:8000/

API Endpoints
Endpoint	Method	Description
/api/register/	POST	Register a new user
/api/request-otp/	POST	Request OTP for email verification
/api/verify-otp/	POST	Verify the OTP and log in the user
Sample Request/Response:
Register User:
Endpoint: POST /api/register/

json
Copy code
{
    "email": "test@example.com",
    "password": "yourpassword"
}
Response:

json
Copy code
{
    "message": "Registration successful. Please verify your email."
}
Request OTP:
Endpoint: POST /api/request-otp/

json
Copy code
{
    "email": "test@example.com"
}
Response:

json
Copy code
{
    "message": "OTP sent to your email."
}
Verify OTP:
Endpoint: POST /api/verify-otp/

json
Copy code
{
    "email": "test@example.com",
    "otp": "123456"
}
Response:

json
Copy code
{
    "message": "Login successful.",
    "token": "your-jwt-token"
}
Testing
Use Postman or cURL to test the API endpoints.
Alternatively, you can test email functionality in Django's interactive shell.
bash
Copy code
python manage.py shell
from django.core.mail import send_mail
send_mail('Subject here', 'Here is the message.', 'your-email@gmail.com', ['recipient@example.com'], fail_silently=False)
Contact Information
For questions or suggestions, feel free to contact:

Manthan Khamkar
Email: manthankhamkar9@gmail.com
GitHub: Manthan-Khamkar

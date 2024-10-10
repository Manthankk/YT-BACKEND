<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Django OTP-Based Email Verification API</title>
</head>
<body>

<h1>Django OTP-Based Email Verification API</h1>

<p>This project is a Django-based authentication system that incorporates OTP (One-Time Password) email verification. The API allows users to register, verify their email using an OTP sent to their inbox, and log in securely using JWT (JSON Web Token).</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#setup-instructions">Setup Instructions</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#contact-information">Contact Information</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
    <li>User Registration: Users can register with their email.</li>
    <li>OTP Generation and Email Verification: An OTP is sent to the user's email for verification.</li>
    <li>JWT Authentication: Users can log in and receive a JWT token for secure access.</li>
    <li>Error Handling: Handles invalid or expired OTPs with proper error messages.</li>
</ul>

<h2 id="technologies-used">Technologies Used</h2>
<ul>
    <li>Django (Backend framework)</li>
    <li>Django REST Framework (API development)</li>
    <li>JWT (JSON Web Token for secure authentication)</li>
    <li>PostgreSQL (Database)</li>
    <li>SMTP (Gmail SMTP for sending emails)</li>
</ul>

<h2 id="project-structure">Project Structure</h2>
<pre>
authentication/
├── authorize/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── authentication/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── templates/
    └── email_verification.html
</pre>

<h2 id="setup-instructions">Setup Instructions</h2>

<h3>Prerequisites</h3>
<ul>
    <li>Python 3.8+</li>
    <li>pip (Python package manager)</li>
    <li>PostgreSQL (or any other database)</li>
</ul>

<h3>Step-by-Step Guide</h3>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/Manthan-Khamkar/Django-OTP-Email-Verification.git
cd Django-OTP-Email-Verification</code></pre>
    </li>
    <li>Create a virtual environment and activate it:
        <pre><code>python -m venv venv
source venv/bin/activate</code></pre>
    </li>
    <li>Install the dependencies:
        <pre><code>pip install -r requirements.txt</code></pre>
    </li>
    <li>Configure SMTP settings for email verification by editing the <code>settings.py</code> file:</li>
    <pre><code>
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-specific-password'</code></pre>
    <li>Apply the migrations and start the server:
        <pre><code>python manage.py migrate
python manage.py runserver</code></pre>
    </li>
    <li>Access the project locally:
        <p>Open your browser and go to <code>http://127.0.0.1:8000/</code></p>
    </li>
</ol>

<h2 id="api-endpoints">API Endpoints</h2>
<table border="1">
    <tr>
        <th>Endpoint</th>
        <th>Method</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>/api/register/</td>
        <td>POST</td>
        <td>Register a new user</td>
    </tr>
    <tr>
        <td>/api/request-otp/</td>
        <td>POST</td>
        <td>Request OTP for email verification</td>
    </tr>
    <tr>
        <td>/api/verify-otp/</td>
        <td>POST</td>
        <td>Verify the OTP and log in the user</td>
    </tr>
</table>

<h3>Sample Request/Response:</h3>

<h4>Register User:</h4>
<p><strong>Endpoint:</strong> <code>POST /api/register/</code></p>
<pre><code>{
    "email": "test@example.com",
    "password": "yourpassword"
}</code></pre>
<p><strong>Response:</strong></p>
<pre><code>{
    "message": "Registration successful. Please verify your email."
}</code></pre>

<h4>Request OTP:</h4>
<p><strong>Endpoint:</strong> <code>POST /api/request-otp/</code></p>
<pre><code>{
    "email": "test@example.com"
}</code></pre>
<p><strong>Response:</strong></p>
<pre><code>{
    "message": "OTP sent to your email."
}</code></pre>

<h4>Verify OTP:</h4>
<p><strong>Endpoint:</strong> <code>POST /api/verify-otp/</code></p>
<pre><code>{
    "email": "test@example.com",
    "otp": "123456"
}</code></pre>
<p><strong>Response:</strong></p>
<pre><code>{
    "message": "Login successful.",
    "token": "your-jwt-token"
}</code></pre>

<h2 id="testing">Testing</h2>
<p>Use Postman or cURL to test the API endpoints.</p>
<p>You can also test email functionality in Django's interactive shell:</p>
<pre><code>python manage.py shell
from django.core.mail import send_mail
send_mail('Subject here', 'Here is the message.', 'your-email@gmail.com', ['recipient@example.com'], fail_silently=False)</code></pre>

<h2 id="contact-information">Contact Information</h2>
<p>For questions or suggestions, feel free to contact:</p>

<p><strong>Manthan Khamkar</strong><br>
Email: <a href="mailto:manthankhamkar9@gmail.com">manthankhamkar9@gmail.com</a><br>
GitHub: <a href="https://github.com/Manthan-Khamkar" target="_blank">Manthan-Khamkar</a></p>

</body>
</html>

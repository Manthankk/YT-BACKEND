<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Django OTP-Based Email Verification API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            color: #c7254e;
            background-color: #f9f2f4;
            padding: 2px 4px;
            border-radius: 3px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>

<h1>Django OTP-Based Email Verification API</h1>

<p>A Django-based authentication system that incorporates OTP (One-Time Password) email verification. This API allows users to register, verify their email using an OTP sent to their inbox, and log in securely using JWT (JSON Web Token).</p>

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
    <li><strong>Django</strong> (Backend framework)</li>
    <li><strong>Django REST Framework</strong> (API development)</li>
    <li><strong>JWT</strong> (JSON Web Token for secure authentication)</li>
    <li><strong>PostgreSQL</strong> (Database)</li>
    <li><strong>SMTP</strong> (Gmail SMTP for sending emails)</li>
</ul>

<h2 id="project-structure">Project Structure</h2>
<pre><code>
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
</code></pre>

<h2 id="setup-instructions">Setup Instructions</h2>

<h3>Prerequisites</h3>
<ul>
    <li>Python 3.8+</li>
    <li>pip (Python package manager)</li>
    <li>PostgreSQL (or any other database)</li>
</ul>

<h3>Step-by-Step Guide</h3>
<ol>
    <li><strong>Clone the repository:</strong>
        <pre><code>git clone https://github.com/Manthan-Khamkar/Django-OTP-Email-Verification.git
cd Django-OTP-Email-Verification</code></pre>
    </li>
    <li><strong>Create a virtual environment and activate it:</strong>
        <pre><code>python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate</code></pre>
    </li>
    <li><strong>Install the dependencies:</strong>
        <pre><code>pip install -r requirements.txt</code></pre>
    </li>
    <li><strong>Configure SMTP settings for email verification:</strong>

        <p>Open the <code>settings.py</code> file and update the following with your Gmail credentials:</p>
        <pre><code>EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-specific-password'</code></pre>
        <p><strong>Note:</strong> For security, it's best to use an App Password instead of your main Gmail password.</p>
    </li>
    <li><strong>Apply the migrations and start the server:</strong>
        <pre><code>python manage.py migrate
python manage.py runserver</code></pre>
    </li>
    <li><strong>Access the project locally:</strong>
        <p>Open your browser and go to <code>http://127.0.0.1:8000/</code></p>
    </li>
</ol>

<h2 id="api-endpoints">API Endpoints</h2>

<table>
    <thead>
        <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>/api/register/</code></td>
            <td>POST</td>
            <td>Register a new user</td>
        </tr>
        <tr>
            <td><code>/api/request-otp/</code></td>
            <td>POST</td>
            <td>Request OTP for email verification</td>
        </tr>
        <tr>
            <td><code>/api/verify-otp/</code></td>
            <td>POST</td>
            <td>Verify the OTP and log in the user</td>
        </tr>
    </tbody>
</table>

<h3 id="sample-requestresponse">Sample Request/Response:</h3>

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
<p>Use <strong>Postman</strong> or <strong>cURL</strong> to test the API endpoints.</p>
<p>Alternatively, you can test email functionality in Django's interactive shell:</p>
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

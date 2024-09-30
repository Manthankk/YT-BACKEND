import random
from datetime import datetime, timedelta
import jwt
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, OTP  # Ensure your OTP model is defined correctly
from .serializers import UserRegistrationSerializer, OTPRequestSerializer, OTPVerificationSerializer
from django.utils import timezone

# JWT settings
JWT_SECRET = settings.SECRET_KEY
JWT_ALGORITHM = 'HS256'

# User Registration
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Send email for verification
            self.send_verification_email(user)
            return Response({"message": "Registration successful. Please verify your email."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_verification_email(self, user):
        otp = str(random.randint(100000, 999999))  # Generate a 6-digit OTP
        # Store OTP in the database
        OTP.objects.create(user=user, otp=otp)  # Assign user instance instead of email

        # Send the OTP via email
        send_mail(
            'Your OTP Code',
            f'Your OTP is {otp}',
            settings.EMAIL_HOST_USER,  # Your email address from settings
            [user.email],  # Use the user's email
            fail_silently=False,
        )

# OTP Request
# OTP Request
class OTPRequestView(APIView):
    def post(self, request):
        serializer = OTPRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)

            # Delete old OTPs for the user
            OTP.objects.filter(user=user).delete()

            # Generate OTP
            otp = str(random.randint(100000, 999999))
            OTP.objects.create(user=user, otp=otp)

            # Send email
            send_mail(
                'Your OTP Code',
                f'Your OTP is {otp}',
                'noreply@example.com',
                [email],
                fail_silently=False,
            )

            return Response({"message": "OTP sent to your email."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# OTP Verification
class OTPVerificationView(APIView):
    def post(self, request):
        serializer = OTPVerificationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_input = serializer.validated_data['otp']

            user = User.objects.get(email=email)

            # Get the latest OTP for the user
            otp_record = OTP.objects.filter(user=user).order_by('-created_at').first()

            if otp_record and otp_record.otp == otp_input:
                if otp_record.created_at + timedelta(minutes=10) > timezone.now():
                    # OTP is valid, proceed with creating JWT token
                    payload = {
                        'user_id': user.id,
                        'exp': datetime.utcnow() + timedelta(hours=1),
                        'iat': datetime.utcnow(),
                    }
                    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

                    return Response({"message": "Login successful.", "token": token}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "OTP has expired."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
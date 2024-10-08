from rest_framework import serializers
from .models import User, OTP

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class OTPRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email not registered")
        return value


class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        email = data.get('email')
        otp = data.get('otp')
        
        try:
            user = User.objects.get(email=email)
            otp_record = OTP.objects.filter(user=user).latest('created_at')
        except (User.DoesNotExist, OTP.DoesNotExist):
            raise serializers.ValidationError("Invalid email or OTP")
        
        if otp_record.otp != otp:
            raise serializers.ValidationError("Invalid OTP")
        
        return data

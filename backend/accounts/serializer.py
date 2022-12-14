from django.contrib.auth import get_user_model
from rest_framework import serializers


# from models import User


class SignupSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            age=validated_data['age'],
            gender=validated_data['gender'],
            phone_number=validated_data['phone_number'],
            photo=validated_data['photo']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'password', 'age', 'gender', 'phone_number', 'photo']


class UserFineByMeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    id = serializers.CharField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'age', 'gender', 'phone_number', 'photo']


class UpdateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'first_name', 'last_name', 'age', 'gender', 'phone_number', 'photo')


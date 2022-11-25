from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .serializer import SignupSerializers
from rest_framework.permissions import AllowAny


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializers
    permission_classes = [
        AllowAny,
    ]

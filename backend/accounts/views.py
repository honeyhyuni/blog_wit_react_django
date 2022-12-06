from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializer import SignupSerializers, UserFineByMeSerializer, UpdateUserSerializer


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializers
    permission_classes = (
        AllowAny,
    )


class UserFineByMe(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserFineByMeSerializer
    permission_classes = (
        IsAuthenticated,
    )

    def get_queryset(self):
        return super().get_queryset().filter(id=self.request.user.id)


class UpdateProfileView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer

    def get_queryset(self):
        return super().get_queryset().filter(id=self.request.user.id)
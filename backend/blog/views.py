from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import FreeBoard, OperateBoard, NoticeInform
from rest_framework.viewsets import ModelViewSet
from .serializers import FreeBoardSerializer, OperateBoardSerializer, NoticeInformSerializer
from rest_framework.permissions import AllowAny


class FreeBoardViewSet(ModelViewSet):
    queryset = FreeBoard.objects.all()
    serializer_class = FreeBoardSerializer
    permission_classes = [AllowAny]


class OperateBoardViewSet(ModelViewSet):
    queryset = OperateBoard.objects.all()
    serializer_class = OperateBoardSerializer
    permission_classes = [AllowAny]


class NoticeInformViewSet(ModelViewSet):
    queryset = NoticeInform.objects.all()
    serializer_class = NoticeInformSerializer
    permission_classes = [AllowAny]

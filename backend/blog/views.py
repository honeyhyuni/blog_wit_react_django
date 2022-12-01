from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import FreeBoard, OperateBoard, NoticeInform
from rest_framework.viewsets import ModelViewSet
from .serializers import FreeBoardSerializer, OperateBoardSerializer, NoticeInformSerializer
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly


class AbstractClass(ModelViewSet):
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id', 'created_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    class Meta:
        abstract = True


class FreeBoardViewSet(AbstractClass):
    queryset = FreeBoard.objects.all()
    serializer_class = FreeBoardSerializer


class OperateBoardViewSet(AbstractClass):
    queryset = OperateBoard.objects.all().select_related('author')
    serializer_class = OperateBoardSerializer


class NoticeInformViewSet(AbstractClass):
    queryset = NoticeInform.objects.all()
    serializer_class = NoticeInformSerializer

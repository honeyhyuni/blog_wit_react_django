from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import FreeBoard, NoticeInform, OperateBoard


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'username', 'name', 'photo'
        ]


class FreeBoardSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = FreeBoard
        fields = ['id', 'author', 'created_at', 'caption', 'title']


class NoticeInformSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = NoticeInform
        fields = ['id', 'author', 'created_at', 'caption', 'title']


class OperateBoardSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = OperateBoard
        fields = ['id', 'author', 'created_at', 'caption', 'title']

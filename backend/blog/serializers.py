from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import FreeBoard, NoticeInform, OperateBoard, FreeComment, InformComment, OperateComment


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'username', 'name', 'photo'
        ]


class FreeBoardSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField('is_like_field')

    def is_like_field(self, post):
        if 'request' in self.context:
            user = self.context['request'].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = FreeBoard
        fields = ['id', 'author', 'created_at', 'caption', 'title', 'updated_at', 'is_like', 'get_like_length']


class NoticeInformSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField('is_like_field')

    def is_like_field(self, post):
        if 'request' in self.context:
            user = self.context['request'].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = NoticeInform
        fields = ['id', 'author', 'created_at', 'caption', 'title', 'updated_at', 'is_like', 'get_like_length']


class OperateBoardSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField('is_like_field')

    def is_like_field(self, post):
        if 'request' in self.context:
            user = self.context['request'].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = OperateBoard
        fields = ['id', 'author', 'created_at', 'caption', 'title', 'updated_at', 'is_like', 'get_like_length']


class FreeCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = FreeComment
        fields = ['id', 'author', 'message', 'created_at', 'updated_at']


class InformCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = InformComment
        fields = ['id', 'author', 'message', 'created_at', 'update_at']


class OperateCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = OperateComment
        fields = ['id', 'author', 'message', 'created_at', 'update_at']

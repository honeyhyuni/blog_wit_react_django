from rest_framework import serializers
from .models import FreeBoard, NoticeInform, OperateBoard


class FreeBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FreeBoard
        fields = '__all__'


class NoticeInformSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeInform
        fields = '__all__'


class OperateBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperateBoard
        fields = '__all__'

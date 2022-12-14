from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.shortcuts import render
from rest_framework import status, filters
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import FreeBoard, OperateBoard, NoticeInform, InformComment, OperateComment, FreeComment
from rest_framework.viewsets import ModelViewSet
from .serializers import FreeBoardSerializer, OperateBoardSerializer, NoticeInformSerializer, OperateCommentSerializer, \
    InformCommentSerializer, FreeCommentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser


class AbstractClass(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id', 'created_at', 'updated_at']
    ordering = ['-updated_at']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if self.request.user == instance.author:
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            response = {
                'detail': 'Update function is not offered without authorization as the owner.'}
            return Response(response, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if self.request.user == instance.author:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            response = {
                'detail': 'Delete function is not offered without authorization as the owner.'}
            return Response(response, status=status.HTTP_403_FORBIDDEN)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    @action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)

    class Meta:
        abstract = True


class FreeBoardViewSet(AbstractClass):
    queryset = FreeBoard.objects.all()
    serializer_class = FreeBoardSerializer


class OperateBoardViewSet(AbstractClass):
    queryset = OperateBoard.objects.all()
    serializer_class = OperateBoardSerializer
    # permission_classes = [IsAdminUser, ]


class NoticeInformViewSet(AbstractClass):
    queryset = NoticeInform.objects.all()
    serializer_class = NoticeInformSerializer


# 댓글 View Interface
class CommentAbstract(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id', 'updated_at']
    ordering = ['-updated_at']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs['post_pk'])
        return qs


class FreeCommentViewSet(CommentAbstract):
    queryset = FreeComment.objects.all()
    serializer_class = FreeCommentSerializer

    def perform_create(self, serializer):
        post = get_object_or_404(FreeComment, pk=self.kwargs['post_pk'])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)


class OperateCommentViewSet(CommentAbstract):
    queryset = OperateComment.objects.all()
    serializer_class = OperateCommentSerializer

    def perform_create(self, serializer):
        post = get_object_or_404(OperateComment, pk=self.kwargs['post_pk'])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)


class InformCommentViewSet(CommentAbstract):
    queryset = InformComment.objects.all()
    serializer_class = InformCommentSerializer

    def perform_create(self, serializer):
        post = get_object_or_404(InformComment, pk=self.kwargs['post_pk'])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)

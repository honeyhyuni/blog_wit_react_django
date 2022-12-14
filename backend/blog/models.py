from django.db import models
from django.conf import settings


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    caption = models.TextField()
    title = models.CharField(max_length=100, null=False, blank=False)
    like_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)

    def get_like_length(self):
        return self.like_user_set.count()

    class Meta:
        abstract = True


class CommentTimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    message = models.TextField()

    class Meta:
        abstract = True


class FreeBoard(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="freeBoard")


class NoticeInform(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="informBoard")


class OperateBoard(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="operateBoard")


class FreeComment(CommentTimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="freeComment")
    post = models.ForeignKey(FreeBoard, on_delete=models.CASCADE)


class InformComment(CommentTimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="InformComment")
    post = models.ForeignKey(NoticeInform, on_delete=models.CASCADE)


class OperateComment(CommentTimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="OperateComment")
    post = models.ForeignKey(OperateBoard, on_delete=models.CASCADE)

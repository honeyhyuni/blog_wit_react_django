from django.db import models
from django.conf import settings


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class FreeBoard(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    caption = models.TextField()
    photo = models.ImageField(upload_to='blogs/freeBoard/%Y/%m/%d')


class NoticeInform(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    caption = models.TextField()
    photo = models.ImageField(upload_to='blogs/noticeInform/%Y/%m/%d')


class OperateBoard(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    caption = models.TextField()
    photo = models.ImageField(upload_to='blogs/operateBoard/%Y/%m/%d')

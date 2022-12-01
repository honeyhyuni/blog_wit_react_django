from django.db import models
from django.conf import settings


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    caption = models.TextField()
    title = models.CharField(max_length=100, null=False, blank=False)

    class Meta:
        abstract = True


class FreeBoard(TimeStampedModel):
    # photo = models.ImageField(upload_to='blogs/freeBoard/%Y/%m/%d', blank=True)
    pass

class NoticeInform(TimeStampedModel):
    pass
    # photo = models.ImageField(upload_to='blogs/noticeInform/%Y/%m/%d', blank=True)


class OperateBoard(TimeStampedModel):
    pass
    # photo = models.ImageField(upload_to='blogs/operateBoard/%Y/%m/%d', blank=True)

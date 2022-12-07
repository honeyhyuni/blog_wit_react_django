from django.db import models
from django.conf import settings


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    caption = models.TextField()
    title = models.CharField(max_length=100, null=False, blank=False)

    class Meta:
        abstract = True


class FreeBoard(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="freeBoard")


class NoticeInform(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="informBoard")


class OperateBoard(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="operateBoard")

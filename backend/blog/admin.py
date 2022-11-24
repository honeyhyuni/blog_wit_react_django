from django.contrib import admin
from .models import FreeBoard, OperateBoard, NoticeInform


@admin.register(FreeBoard)
class UserAdmin(admin.ModelAdmin):
    list_display = ['caption']
    list_display_links = ['caption']


@admin.register(OperateBoard)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(NoticeInform)
class UserAdmin(admin.ModelAdmin):
    pass

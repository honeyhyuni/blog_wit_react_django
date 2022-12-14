from django.contrib import admin
from .models import FreeBoard, OperateBoard, NoticeInform, OperateComment, InformComment, FreeComment


@admin.register(FreeBoard)
class UserAdmin(admin.ModelAdmin):
    list_display = ['caption']
    list_display_links = ['caption']


@admin.register(OperateBoard)
class UserAdmin(admin.ModelAdmin):
    list_display = ['caption']
    list_display_links = ['caption']


@admin.register(NoticeInform)
class UserAdmin(admin.ModelAdmin):
    list_display = ['caption']
    list_display_links = ['caption']


@admin.register(FreeComment)
class Admin(admin.ModelAdmin):
    list_display = ['message']
    list_display_links = ['message']


@admin.register(InformComment)
class Admin(admin.ModelAdmin):
    list_display = ['message']
    list_display_links = ['message']


@admin.register(OperateComment)
class Admin(admin.ModelAdmin):
    list_display = ['message']
    list_display_links = ['message']

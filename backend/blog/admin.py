from django.contrib import admin
from .models import FreeBoard


@admin.register(FreeBoard)
class UserAdmin(admin.ModelAdmin):
    list_display = ['caption']
    list_display_links = ['caption']

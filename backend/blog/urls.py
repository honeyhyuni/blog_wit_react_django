from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .import views
router = DefaultRouter()
router.register('free', views.FreeBoardViewSet)
router.register('operate', views.OperateBoardViewSet)
router.register('inform', views.NoticeInformViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
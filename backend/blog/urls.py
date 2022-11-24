from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .import views
router = DefaultRouter()
router.register('freeb', views.FreeBoardViewSet)
router.register('operateb', views.OperateBoardViewSet)
router.register('informb', views.NoticeInformViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
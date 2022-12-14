from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .import views
router = DefaultRouter()
router.register('free', views.FreeBoardViewSet)
router.register('operate', views.OperateBoardViewSet)
router.register('inform', views.NoticeInformViewSet)
router.register(r'free/(?P<post_pk>\d+)/comments', views.FreeCommentViewSet)
router.register(r'inform/(?P<post_pk>\d+)/comments', views.InformCommentViewSet)
router.register(r'operate/(?P<post_pk>\d+)/comments', views.OperateCommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
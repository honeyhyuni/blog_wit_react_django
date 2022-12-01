from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register('userbyme', views.UserFineByMe)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', views.SignupView.as_view(), name="signup"),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),
]
from django.urls import path,include
from .views import AdminDashboardSummaryView, ProfileView, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'), 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    # users/urls.py
    path('admin-dashboard-summary/', AdminDashboardSummaryView.as_view(), name='dashboard-summary'),
]
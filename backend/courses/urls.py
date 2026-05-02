from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, DashboardSummaryView

router = DefaultRouter()
router.register(r'list', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-summary/', DashboardSummaryView.as_view(), name='dashboard-summary'),
]



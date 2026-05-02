from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Course, Category, Enrollment
from .serializers import CourseSerializer, CategorySerializer, EnrollmentSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

User = get_user_model()


class CourseViewSet(viewsets.ModelViewSet): 
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()


class DashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'total_users': User.objects.count(),
            'total_courses': Course.objects.count(), 
            'total_enrollments': Enrollment.objects.count(), 
            'role_wise_users': {
                'admins': User.objects.filter(role='admin').count(), 
                'instructors': User.objects.filter(role='instructor').count(),
                'students': User.objects.filter(role='student').count(),
            }
        }
        return Response(data)
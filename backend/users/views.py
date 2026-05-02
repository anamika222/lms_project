from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer, UserProfileSerializer
from .models import User
from courses.models import Course, Enrollment
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_object(self):
        return self.request.user
    

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        # Role update kora jeno secure hoy (shudhu admin role change korte parbe)
        if 'role' in request.data and not user.is_staff:
            return Response({"detail": "You cannot change your own role."}, status=403)
        return super().update(request, *args, **kwargs)

class AdminDashboardSummaryView(APIView):
    def get(self, request):
        stats = {
            'total_users': User.objects.count(),
            'total_courses': Course.objects.count(),
            'total_enrollments': Enrollment.objects.count(),
            'role_wise': {
                'admin': User.objects.filter(role='admin').count(),
                'instructor': User.objects.filter(role='instructor').count(),
                'student': User.objects.filter(role='student').count(),
            }
        }
        return Response(stats)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "full_name": user.first_name + " " + user.last_name, 
        })

    def patch(self, request):
        user = request.user
       
        name_parts = request.data.get('full_name', '').split(' ')
        user.first_name = name_parts[0]
        if len(name_parts) > 1:
            user.last_name = " ".join(name_parts[1:])
        user.save()
        return Response({"message": "Profile updated successfully"})
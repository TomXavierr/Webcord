from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from accounts.models import UserAccount
from .serializers import UserListSerializer,AdminLoginSerializer
from accounts.permissions import IsSuperuser

from rest_framework.permissions import IsAuthenticated

class AdminLoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    # def post(self, request, *args, **kwargs):
    #     response = super().post(request, *args, **kwargs)
    #     token = response.data.get("access")

    #     email = request.data.get('email')
    #     password = request.data.get('password')

    #     if email and password:
    #         user = authenticate(request, email=email, password=password)
    #         if user is not None and user.is_superuser:
    #             login(request, user)
    #             return Response({'token': token, 'id': user.pk}, status=status.HTTP_200_OK)
        
    #     return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        

    def post(self, request, *args, **kwargs):
        response = super(AdminLoginView, self).post(
            request, *args, **kwargs)
        token = response.data.get("access")

        email = request.data['email']
        password = request.data['password']
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            User = authenticate(email=email, password=password)
            if User is not None and User.is_superuser:
                login(request, User)
                return Response({'token': token, 'id': User.pk}, status=status.HTTP_200_OK)
            else:
                return Response({'error': "password or email not valid"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminUsersListView(APIView):

    # permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated, IsSuperuser]

    def get(self, request):
        try:
            User = UserAccount.objects.all()
            serializer = UserListSerializer(User, many=True)

        except UserAccount.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_200_OK)

from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

#Generates Simple JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        print("Going out serializer")
        if serializer.is_valid():
            print("Inside is_valid")
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'msg': 'New user is created', 'token': token}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
    
        
        if (serializer.is_valid(raise_exception=True)):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            
            if user is not None:
                token = get_tokens_for_user(user)
                login(request, user)
                return Response({'msg': 'Login Success', 'token': token}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email or Password is not valid']}}, status=status.HTTP_404_NOT_FOUND)
    

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)    
        return Response(serializer.data, status=status.HTTP_200_OK)




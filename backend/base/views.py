from django.shortcuts import render
from .models import Employee, Department, Task
from rest_framework.views import APIView
from .serializers import EmployeeSerializer, DepartmentSerializer, EmployeeDetailSerializer, TaskSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
# Create your views here.


class DepartmentListView(APIView):
    def get(self, request):
    
        query = "SELECT id, name from base_department"
        departments = Department.objects.raw(query)
        serializer = DepartmentSerializer(departments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class EmployeeRegistrationView(APIView):
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Created"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Not created"}, status=status.HTTP_400_BAD_REQUEST)
        

class EmployeeDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print("user =", request.user)
        employee = Employee.objects.get(user=request.user)
        serializer = EmployeeDetailSerializer(employee)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class EmployeeFileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        try:
            employee = Employee.objects.get(id=pk)
            serializer = EmployeeDetailSerializer(employee, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"msg": "Uploaded"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Only PDF format allowed"})
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class TaskListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            employee = Employee.objects.get(id=pk)
            tasks = Task.objects.filter(assigned_to=employee)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response({"error" : "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error" : str(e)}, status=status.HTTP_404_NOT_FOUND)



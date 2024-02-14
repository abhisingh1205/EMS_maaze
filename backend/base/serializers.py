from rest_framework import serializers
from account.serializers import UserRegistrationSerializer
from .models import Employee, Department, Task
from account.models import User

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'date_joined']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'password']

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fiels = ['name']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['name']

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    department = DepartmentSerializer()

    class Meta:
        model = Employee
        fields= ['user', 'department']


    def validate(self, attrs):
        d_name = attrs['department']['name']
        d_obj = Department.objects.get(name=d_name) 

        if not d_obj:
            raise serializers.ValidationError("Department not exist")
        return attrs
    
    def create(self,validated_data):
        depart = Department.objects.get(name=validated_data['department']['name'])
        user_email = validated_data['user']['email']
        user_password = validated_data['user']['password']
        user_name = validated_data['user']['name']
        
        user = User.objects.create_user(email=user_email, name=user_name, password=user_password)
        emp = Employee.objects.create(user=user, department=depart)
        return emp
    
class EmployeeDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    department = DepartmentSerializer()
    manager_name = serializers.SerializerMethodField()
    class Meta:
        model = Employee
        fields = ['id', 'user', 'department', 'manager_name']

    def validate(self, attrs):
        file = attrs.get('files')
        if file:
            if not file.name.endswith('.pdf'):
                raise serializers.ValidationError("Only pdf format is allowed")
        
        return attrs
    def update(self, instance, validated_data):
        instance.files = validated_data.get('files', instance.files)
        instance.save()
        return instance
    
    def get_manager_name(self, obj):
        if obj.manager:
            print("Manager Name = ", obj.manager.user.name)
            return obj.manager.user.name
        return None
    

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'




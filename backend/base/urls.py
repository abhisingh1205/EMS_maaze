from django.urls import path
from .views import EmployeeRegistrationView, DepartmentListView, EmployeeDetailView, EmployeeFileUploadView, TaskListView

urlpatterns = [
    path('empregister/', EmployeeRegistrationView.as_view(), name="empregister"),
    path('list-departments/', DepartmentListView.as_view(), name="list-departments"),
    path('emp-profile/', EmployeeDetailView.as_view(), name="emp-profile"),
    path('emp-file/<int:pk>', EmployeeFileUploadView.as_view(), name="emp-file"),
    path('tasks-list/<int:pk>', TaskListView.as_view(), name="tasks-list"),
]
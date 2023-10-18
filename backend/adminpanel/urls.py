from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path("", admin_login, name="admin_login"),
    path("dashboard/", dashboard, name="dashboard"),
    path("logout/", Logoutpage, name="logout"),
    path("globalsetting/", globalsetting, name="globalsetting"),
    path("contactus/", contactus, name="contactus"),
    path("delete_contact/<int:pk>/", delete_contact, name="delete_contact"),
   
    path("course/", course, name="course"),
    path("course_view/<int:pk_list>/", course_view, name="course_view"),
    path("course_view/", course_view, name="course_view"),
    path("delete_course/<int:pk>/", delete_course, name="delete_course"),
    
    path("main_navigation/<int:parent_id>/", main_navigation, name="main_navigation"),
    path("main_navigation/", main_navigation, name="main_navigation"),
    path("navigation/", navigation_list, name="navigation"),
    path("navigation/<int:parent_id>/", navigation_list, name="navigation"),
    path("update/<int:pk>/", update, name="update"),
    path("delete_nav/<int:pk>/", delete_nav, name="delete_nav"),
]

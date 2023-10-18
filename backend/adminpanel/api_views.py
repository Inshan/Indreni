from .serializers import *
from rest_framework import viewsets
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from django.shortcuts import redirect, HttpResponse

# ViewSets define the view behavior.


class GlobalViewSet(viewsets.ModelViewSet):
    queryset = GlobalSettings.objects.all()
    serializer_class = GlobalSettingsSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication)


class GlobalSettings(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """

    def get_object(self, pk):
        try:
            return GlobalSettings.objects.get(pk=pk)
        except GlobalSettings.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = GlobalSettingsSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = GlobalSettingsSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, format=None):
        serializer = GlobalSettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NavigationViewSet(viewsets.ModelViewSet):
    queryset = Navigation.objects.all()
    serializer_class = NavigationSerializer


class Navigation(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """

    def get_object(self, pk):
        try:
            return Navigation.objects.get(pk=pk)
        except Navigation.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = NavigationSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = NavigationSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, format=None):
        serializer = NavigationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = ContactUS.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # print(request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Contact form data received"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class contactUS(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """

    def get(self, request, format=None):
        data = request.data
        # Example: Save the form data to the ContactUS model
        contact = ContactUS.objects.create(
            full_name=data.get("full_name"),
            email=data.get("email"),
            subject=data.get("subject"),
            message=data.get("message"),
        )
        # Return a response
        return Response(
            {"message": "Contact form data received"}, status=status.HTTP_201_CREATED
        )

    def get_object(self, pk):
        try:
            return ContactUS.objects.get(pk=pk)
        except ContactUS.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ContactSerializer(snippet)
        return Response(serializer.data)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # print(request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Form data received"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    


class course(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """

    def get(self, request, format=None):
        data = request.data
        # Example: Save the form data to the ContactUS model
        contact = Course.objects.create(
            name=data.get("name"),
            address=data.get("address"),
            gender=data.get("gender"),
            dateofbirth=data.get("dateofbirth"),
            mobileno = data.get('mobileno'),
            email = data.get('email'),
            education = data.get.get('education'),
            prof = data.get('prof'),
            courselevel = data.get('courselevel'),
            nationality = data.get('nationality'),
        )
        # Return a response
        return Response(
            {"message": "Contact form data received"}, status=status.HTTP_201_CREATED
        )

    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CourseSerializer(snippet)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

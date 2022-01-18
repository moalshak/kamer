from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from .serializers import RegistrationSerializer

"""
    to register a new user using the api
"""


@api_view(
    ["POST", "GET"],
)
@renderer_classes((JSONRenderer, CSVRenderer))
@permission_classes((AllowAny,))
def registration_view(request):
    if request.method == "POST":
        # serialize the incoming data using the RegistrationSerializer
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            # this will run the override method in RegistrationSerializer
            account = serializer.save()
            # server response
            data["response"] = "Successfully registered the new user"
            data["email"] = account.email
            data["username"] = account.username
            data["first_name"] = account.first_name
            data["last_name"] = account.last_name
            token = Token.objects.get(user=account).key
            data["token"] = token
        else:
            data = serializer.errors

        return Response(data)
    else:
        return Response({})

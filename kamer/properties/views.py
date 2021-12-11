# Create your views here.
import json
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Property
from django.forms.models import model_to_dict

# Create your views here.

def home(request):
    properties_ =  Property.objects.all()
    properties = []
    for i in properties_:
        properties.append((Property (i)).toJSON())
    return HttpResponse(properties)


def getProperty(request, externalId):
    if request.method == 'GET':
        p = Property.objects.get(externalId = externalId)
        return HttpResponse(p.toJSON())
    else:
        return HttpResponse("NOT IMPLEMENTED")

def room(request):
    return HttpResponse('Room')
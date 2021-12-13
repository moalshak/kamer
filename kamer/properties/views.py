# Create your views here.
import statistics
from decimal import Decimal as D

from django.db.models import Max
from django.template.defaultfilters import length
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from properties.models import Property
from properties.serializers import PropertySerializer, StatsSerializer


# Create your views here.

def home(request):
    properties = Property.objects.all()
    serializer = PropertySerializer(properties, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_property(request):
    serializer = PropertySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        Property.objects.create(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def getProperty(request, externalId):
    if request.method == 'GET':
        serializer = PropertySerializer(p)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PropertySerializer(p, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        p.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def get_propertyByLocation(request):
    if request.method == 'GET':
        latitude = request.GET.get("latitude", None)
        longitude = request.GET.get("longitude", None)
        return locationHelper(latitude, longitude, request)
    elif request.method == 'PUT':
        latitude = request.PUT.get("latitude", None)
        longitude = request.PUT.get("longitude", None)
        return locationHelper(latitude, longitude, request)

    elif request.method == 'DELETE':
        latitude = request.DELETE.get("latitude", None)
        longitude = request.DELETE.get("longitude", None)
        return locationHelper(latitude, longitude, request)


@api_view(['GET'])
#todo nResults using pagination
def get_propertyByCityPreferences(request, city):
    if request.method == 'GET':

        #TODO review api
        # Budget
        # budget = request.GET.get('budget', None)
        # Sqaure meter budget
        # sqmBudget = request.GET.get('sqmBudget', None)

        orderBY = request.GET.get('orderBY', 'rent')
        ascOrDesc = request.GET.get('ascOrDesc', 'ASC')

        # Price Range
        deafaultMaxRange = Property.objects.aggregate(Max('rent'))['rent__max']
        minRange = D(request.GET.get('minRange', 0))
        maxRange = D(request.GET.get('maxRange', deafaultMaxRange))

        # Pets
        pets_choice = request.GET.get('pets', '%')

        # Area
        deafaultMaxArea = Property.objects.aggregate(Max('areaSqm'))['areaSqm__max']
        minArea = int(request.GET.get('minArea', 0))
        maxArea = int(request.GET.get('maxArea', deafaultMaxArea))
        query = f"SELECT * FROM properties_property " \
                    f"WHERE areaSqm BETWEEN {minArea} AND {maxArea} " \
                    f"AND rent BETWEEN {minRange} AND {maxRange} " \
                    f"AND pets LIKE '{pets_choice}' " \
                    f" ORDER BY {orderBY} {ascOrDesc} "
        
        try:
            p = Property.objects.filter(city=city).raw(query)
        except Property.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PropertySerializer(p, many=True)
        return Response(serializer.data)


def locationHelper(latitude, longitude, request):
    try:
        p = Property.objects.filter(latitude=latitude).filter(longitude=longitude)
    except Property.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PropertySerializer(p, many=True)
    if serializer.is_valid() & request.method == 'PUT':
        serializer.save()
    elif serializer.is_valid() & request.method == 'DELETE':
        p.delete()


@api_view(['GET'])
def stats(request, city):
    if request.method == 'GET':
        p = Property.objects.filter(city=city)

        len = length(p)
        rent = []
        deposit = []
        rcSum = 0
        rdSum = 0

        for i in range(0, len):
            try:
                rcSum += p[i].rent
                rdSum += p[i].deposit
                rent.append(p[i].rent)
                deposit.append(p[i].deposit)
            except TypeError:
                len = len - 1
                pass
        rent.sort()
        deposit.sort()

        # rcMean = float(rcSum) / len
        # rdMean = float(rdSum) / len
        # rcMedian = rent[len/2]
        # rdMedian = deposit[len/2]
        # rcSd = statistics.stdev(rent)
        # rdSd = statistics.stdev(deposit)
        print(deposit)
        stats = Stats(rcMean = float(rcSum) / len, rdMean = float(rdSum) / len, rcMedian = rent[int(len/2)], rdMedian = deposit[int(len/2)], rcSd = statistics.stdev(rent), rdSd = statistics.stdev(deposit))
        serializer = StatsSerializer(stats)
        return Response(serializer.data)
        
class Stats:
    def __init__(self, rcMean, rdMean, rcMedian, rdMedian, rcSd, rdSd):
        self.rcMean = rcMean
        self.rdMean = rdMean
        self.rcMedian = rcMedian
        self.rdMedian = rdMedian
        self.rcSd = rcSd
        self.rdSd = rdSd


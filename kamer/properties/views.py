# Create your views here.
import statistics
from decimal import Decimal as D

from django.db.models import Max
from django.template.defaultfilters import length
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from .models import Property
from .serializers import PropertySerializer, StatsSerializer

'''
    dependent on the request type:
    GET : returns all properties in database
    POST: adds a property to the database
'''
@api_view(['GET', 'POST'])
@renderer_classes((JSONRenderer, CSVRenderer))
def properties(request):
    if request.method == "GET":
        properties = Property.objects.all()
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        return add_property(request)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

'''
    adds a property to the database using the request.data
'''
def add_property(request):
    serializer = PropertySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
    using an (existent) externalId either:
        returns the property (GET)
        updates the property (PUT)
        deletes the property (DELETE)
'''
@api_view(['GET', 'PUT', 'DELETE'])
@renderer_classes((JSONRenderer, CSVRenderer))
def property_by_id(request, externalId, format=None):
    try:
        p = Property.objects.get(externalId=externalId)
    except Property.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
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

'''
    extracts the longitude & latitude from the url (query)
    then calls the helper function 
'''
@api_view(['GET', 'PUT', 'DELETE'])
@renderer_classes((JSONRenderer, CSVRenderer))
def get_propertyByLocation(request, format=None):
    if request.method == 'GET' or request.method == 'PUT' or request.method == 'DELETE':
        latitude = request.GET.get("latitude", '0')
        longitude = request.GET.get("longitude", '0')
        return locationHelper(latitude, longitude, request)

'''
    the helper function for the location
    dependent on the request:
        GET : returns a list of all properties that match the longitude and latitude
        PUT : updates all the properties that match the longitude and latitude
        DELETE : deletes all the properties that match the longitude and latitude
'''
def locationHelper(latitude, longitude, request):
    try:
        p = Property.objects.filter(latitude=latitude).filter(longitude=longitude)
    except Property.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    ids = []
    for p_ in p:
        ids.append(p_.externalId)

    if request.method == 'PUT':
        for id_ in ids:
            p2 = Property.objects.get(externalId=id_)
            for key in request.data.keys():
                setattr(p2, str(key), request.data[key])
            p2.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    elif request.method == 'DELETE':
        p.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    elif request.method == 'GET':
        serializer = PropertySerializer(p, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

'''
    given a city returns all properties that match the query parameters from the url
    1. The order : Ascending or Descending
    2. Rent price range: min, max or both
    3. Pets: if pets are allowed
    4. Area : min, max or both
    5. Square Meter budget: max rent price per square meter maxPrice/maxArea
    6. N : number of properties wanted to return Default is 10
'''
@api_view(['GET'])
@renderer_classes((JSONRenderer, CSVRenderer))
# todo nResults using pagination
def get_propertyByCityPreferences(request, city, format=None):
    if request.method == 'GET':

        orderBY = request.GET.get('orderBY', 'rent')
        ascOrDesc = request.GET.get('ascOrDesc', 'ASC')

        # Price Range
        defaultMaxPrice = Property.objects.aggregate(Max('rent'))['rent__max']
        minPrice = D(request.GET.get('minPrice', 0))
        maxPrice = D(request.GET.get('maxPrice', defaultMaxPrice))

        # Pets
        pets_choice = request.GET.get('pets', '%')

        # Area
        defaultMaxArea = Property.objects.aggregate(Max('areaSqm'))['areaSqm__max']
        minArea = int(request.GET.get('minArea', 0))
        maxArea = int(request.GET.get('maxArea', defaultMaxArea))

        # Sqaure meter budget
        sqmBudget = D(request.GET.get('sqmBudget', defaultMaxPrice/defaultMaxArea))

        N = D(request.GET.get('N', 10))

        query = f"SELECT * FROM properties_property " \
                f"WHERE city LIKE '{city}' " \
                f"AND areaSqm BETWEEN {minArea} AND {maxArea} " \
                f"AND rent BETWEEN {minPrice} AND {maxPrice} " \
                f"AND pets LIKE '{pets_choice}' " \
                f"AND rent / areaSqm <= {sqmBudget} " \
                f" ORDER BY {orderBY} {ascOrDesc} " \
                f"LIMIT {N};"

        try:
            p = Property.objects.raw(query)
        except Property.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PropertySerializer(p, many=True)
        return Response(serializer.data)

'''
    returns the stats of a given city
'''
@api_view(['GET'])
@renderer_classes((JSONRenderer, CSVRenderer))
def stats(request, city, format=None):
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

        stats = Stats(rcMean=float(rcSum) / len, rdMean=float(rdSum) / len, rcMedian=rent[int(len / 2)],
                      rdMedian=deposit[int(len / 2)], rcSd=statistics.stdev(rent), rdSd=statistics.stdev(deposit))
        serializer = StatsSerializer(stats)
        return Response(serializer.data)

'''
    represents the stats needed for the city
'''
class Stats:
    def __init__(self, rcMean, rdMean, rcMedian, rdMedian, rcSd, rdSd):
        self.rcMean = rcMean
        self.rdMean = rdMean
        self.rcMedian = rcMedian
        self.rdMedian = rdMedian
        self.rcSd = rcSd
        self.rdSd = rdSd

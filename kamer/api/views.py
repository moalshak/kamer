# Create your views here.
import csv
import statistics
from decimal import Decimal as D

from django.db.models import Max
from django.shortcuts import render
from django.template.defaultfilters import length
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    renderer_classes,
)
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from .models import Property
from .serializers import PropertySerializer, StatsSerializer


def api_home_page(request):
    return render(request, "api/api_home.html")


"""
    A Class based view to view the properties in pages
    dependent on the request type:
    GET : returns all properties in database
    POST: adds a property to the database
"""


class Pagination(PageNumberPagination):
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_page_size(self, request):
        if self.page_size_query_param:
            page_size = min(
                int(
                    request.query_params.get(self.page_size_query_param, self.page_size)
                ),
                self.max_page_size,
            )
            if page_size > 0:
                return page_size
            elif page_size == 0:
                return None
            else:
                page_size = 10

        return self.page_size


class PropertiesListView(ListAPIView):
    ##################################################
    # DO NOT MODIFY THIS HAS TO BE EXACTLY LIKE THIS #
    ##################################################
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (AllowAny,)
    pagination_class = Pagination

    def post(self, request, *args, **kwargs):
        return add_property(request)

    ####################################################


"""
    adds a property to the database using the request.data
"""


def add_property(request):
    # TODO: add an owner field. Then set that field to the user/requester then uncomment below
    # property = Property(owner=request.user)
    # serializer = PropertySerializer(property, data=request.data)
    serializer = PropertySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""
    using an (existent) externalId either:
        returns the property (GET)
        updates the property (PUT)
        deletes the property (DELETE)
"""


@api_view(["GET", "PUT", "DELETE"])
@renderer_classes((JSONRenderer, BrowsableAPIRenderer, CSVRenderer))
@authentication_classes((SessionAuthentication, TokenAuthentication))
@permission_classes((AllowAny,))
def property_by_id(request, externalId, format=None):
    try:
        p = Property.objects.get(externalId=externalId)
    except Property.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # TODO: only allow an the PUT if the renter of the this property is the requester (by adding in the database
    #  an owner field and populating it) then uncomment below
    """
        requester = request.user
        if request.method != 'GET' and p.owner != requester:
            return Response({'Response':"You do not have permission to edit that"})
    """
    if request.method == "GET":
        serializer = PropertySerializer(p)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = PropertySerializer(p, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        p.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


"""
    extracts the longitude & latitude from the url (query)
    then calls the helper function 
"""


class get_propertyByLocation(ListAPIView):
    serializer_class = PropertySerializer
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (AllowAny,)
    pagination_class = Pagination

    def get_queryset(self):
        try:
            latitude = self.request.GET.get("latitude", "0")
            longitude = self.request.GET.get("longitude", "0")
            return Property.objects.filter(latitude=latitude).filter(
                longitude=longitude
            )
        except Property.DoesNotExist:
            return None

    def put(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        ids = []
        for p_ in queryset:
            ids.append(p_.externalId)
        for id_ in ids:
            p2 = Property.objects.get(externalId=id_)
            for key in request.data.keys():
                setattr(p2, str(key), request.data[key])
            p2.save()
        return Response(status=status.HTTP_202_ACCEPTED)

    def delete(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


"""
    given a city returns all properties that match the query parameters from the url
    1. The order : Ascending or Descending
    2. Rent price range: min, max or both
    3. Pets: if pets are allowed
    4. Area : min, max or both
    5. Square Meter budget: max rent price per square meter maxPrice/maxArea
    6. N : number of properties wanted to return Default is 10
"""

"""
    returns the stats of a given city
"""


@api_view(["GET"])
@renderer_classes((BrowsableAPIRenderer, JSONRenderer, CSVRenderer))
@authentication_classes((SessionAuthentication, TokenAuthentication))
@permission_classes((AllowAny,))
def stats(request, city, format=None):
    if request.method == "GET":
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
        if len == 0:
            len = 1
        rent.sort()
        deposit.sort()

        stats = Stats(
            rcMean=float(rcSum) / len,
            rdMean=float(rdSum) / len,
            rcMedian=rent[int(len / 2)],
            rdMedian=deposit[int(len / 2)],
            rcSd=statistics.stdev(rent),
            rdSd=statistics.stdev(deposit),
        )
        serializer = StatsSerializer(stats)
        return Response(serializer.data)


"""
    represents the stats needed for the city
"""


class Stats:
    def __init__(self, rcMean, rdMean, rcMedian, rdMedian, rcSd, rdSd):
        self.rcMean = rcMean
        self.rdMean = rdMean
        self.rcMedian = rcMedian
        self.rdMedian = rdMedian
        self.rcSd = rcSd
        self.rdSd = rdSd


"""
    Pagination view for the properties from /city/
"""


class CityPrefListView(ListAPIView):
    ##################################################
    # DO NOT MODIFY THIS HAS TO BE EXACTLY LIKE THIS #
    ##################################################
    serializer_class = PropertySerializer
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (AllowAny,)
    pagination_class = Pagination

    def get_queryset(self):
        # each parameter has to have an except since it can also
        # not be given in the url aka KeyError.
        # TODO check if we are receiving the parameters
        city = self.kwargs["city"]

        # Order by :: Default : rent
        orderBY = self.request.GET.get("orderBy", "rent")

        # Ascending or Descending :: Default : Ascending

        ascOrDesc = self.request.GET.get("ascOrDesc", "ASC")

        # N = self.request.GET.get("N", 10)
        # PageNumberPagination.page_size = N

        # Price Range :: Default : 1000
        try:
            defaultMaxPrice = Property.objects.aggregate(Max("rent"))["rent__max"]
        except KeyError:
            defaultMaxPrice = 1000

        # Min Price :: Default 0
        minPrice = D(self.request.GET.get("minPrice", 0))

        # Max Price :: Default : defaultMaxPrice
        maxPrice = D(self.request.GET.get("maxPrice", defaultMaxPrice))

        # Pets :: Default : %
        pets_choice = self.request.GET.get("pets", "%")

        # Area :: Default : 1000
        try:
            defaultMaxArea = Property.objects.aggregate(Max("areaSqm"))["areaSqm__max"]
        except KeyError:
            defaultMaxArea = 1000

        # min area :: Default : 0
        minArea = int(self.request.GET.get("minArea", 0))

        # min area :: Default : defaultMaxArea
        maxArea = int(self.request.GET.get("maxArea", defaultMaxArea))

        # sqmBudget :: Default : defaultMaxPrice / defaultMaxArea
        sqmBudget = D(
            self.request.GET.get("sqmBudget", defaultMaxPrice * defaultMaxArea)
        )

        query = (
            f"SELECT * FROM api_property    "
            f"WHERE city LIKE '{city}' "
            f"AND areaSqm BETWEEN {minArea} AND {maxArea} "
            f"AND rent BETWEEN {minPrice} AND {maxPrice} "
            f"AND pets LIKE '{pets_choice}' "
            f"AND rent / areaSqm <= {sqmBudget} "
            f" ORDER BY {orderBY} {ascOrDesc} "
        )

        # TODO sqm budget default is retarded
        return Property.objects.raw(query)

    ####################################################

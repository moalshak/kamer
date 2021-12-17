import json
from django.db import models


# Create your models here.
class Property(models.Model):
    externalId = models.TextField(primary_key=True)
    areaSqm = models.IntegerField(null=False)
    city = models.TextField(null=False)
    coverImageUrl = models.TextField(null=True)
    furnish = models.TextField(null=False)
    latitude = models.TextField(null=False)
    longitude = models.TextField(null=False)
    postalCode = models.TextField(null=False)
    propertyType = models.TextField(null=False)
    rent = models.IntegerField(null=False)
    title = models.TextField(null=True)
    deposit = models.IntegerField(null=True)
    descriptionTranslated = models.TextField(null=True)
    gender = models.TextField(null=True)
    isRoomActive = models.BooleanField(null=True, default=True)
    pageDescription = models.TextField(null=True, default='')
    pageTitle = models.TextField(null=True, default='')
    pets = models.CharField(null=True, max_length=3, default='')
    roommates = models.CharField(null=True, max_length=10, default='')

# the fields above are:
    # externalId
    # areaSqm
    # city
    # coverImageUrl
    # furnish
    # latitude
    # longitude
    # postalCode
    # propertyType
    # rent
    # title
    # deposit
    # descriptionTranslated
    # gender
    # isRoomActive
    # pageDescription
    # pageTitle
    # pets
    # roommates
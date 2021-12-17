from django.db.models import fields
from rest_framework import serializers
from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('externalId', 'areaSqm', 'city', 'coverImageUrl', 'furnish', 'latitude', 'longitude', 'postalCode',
                  'propertyType', 'rent', 'title', 'deposit', 'descriptionTranslated', 'gender', 'isRoomActive',
                  'pageDescription', 'pageTitle', 'pets', 'roommates')
    #def update(self, instance, validated_data):



class StatsSerializer(serializers.Serializer):
    rcMean = serializers.FloatField()
    rdMean = serializers.FloatField()
    rcMedian = serializers.IntegerField()
    rdMedian = serializers.IntegerField()
    rcSd = serializers.FloatField()
    rdSd = serializers.FloatField()

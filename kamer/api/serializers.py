from rest_framework import serializers

from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    # TODO: when adding the owner field in the database do the following:
    #   owner_username = serializers.SerializerMethodField('get_username_from_owner')
    #   then uncomment the 'get_username_from_owner'

    class Meta:
        model = Property
        fields = ['externalId', 'areaSqm', 'city', 'coverImageUrl', 'furnish', 'latitude', 'longitude', 'postalCode',
                  'propertyType', 'rent', 'title', 'deposit', 'descriptionTranslated', 'gender', 'isRoomActive',
                  'pageDescription', 'pageTitle', 'pets', 'roommates']

    # def get_username_from_owner(self, Property):
    #     owner_username =  Property.owner.username
    #     return owner_username


class StatsSerializer(serializers.Serializer):
    rcMean = serializers.FloatField()
    rdMean = serializers.FloatField()
    rcMedian = serializers.IntegerField()
    rdMedian = serializers.IntegerField()
    rcSd = serializers.FloatField()
    rdSd = serializers.FloatField()

from rest_framework import serializers
from .models import *
import re


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

    def validate(self, data):
        if data.get("year") < 1700:
            raise serializers.ValidationError("Year less than 1700")
        if not re.match("^[0-9.0-9]", data.get("cc")):
            raise serializers.ValidationError("CC = (0-9).(0-9)")
        if not data.get("hp").isnumeric():
            raise serializers.ValidationError("HP > 0 and only digit characters")
        return data


class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = '__all__'

    def validate(self, data):
        if data.get("age") < 14:
            raise serializers.ValidationError("Age >= 14")
        return data


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryService
        fields = '__all__'

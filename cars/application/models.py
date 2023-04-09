from django.db import models


class Car(models.Model):
    transmission_types = [
        ["M", "Manual"],
        ["A", "Automatic"],
        ["C", "CVT"],
    ]
    fuel_types = [
        ["G", "Gasoline"],
        ["D", "Diesel"],
        ["BD", "Bio-Diesel"],
        ["E", "Electric"],
    ]
    model = models.CharField(max_length=200)
    year = models.IntegerField()
    fuel_type = models.CharField(choices=fuel_types, max_length=200)
    cc = models.CharField(blank=True, max_length=200)
    hp = models.CharField(max_length=200)
    transmission_type = models.CharField(choices=transmission_types, max_length=200)

    def __str__(self):
        return str(self.id) + ' ' + str(self.model)


class Buyer(models.Model):
    sex_options = [
        ["M", "Male"],
        ["F", "Female"],
        ["D", "Disabled"],
        ["N", "Do not want to answer"],
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    sex = models.CharField(choices=sex_options, max_length=20)
    car = models.ForeignKey(Car, on_delete=models.DO_NOTHING)

    def __str__(self):
        return str(self.id) + ' ' + self.first_name + ' ' + self.last_name


class DeliveryService(models.Model):
    delivery_person = models.CharField(blank=True, max_length=100)
    fee = models.IntegerField(blank=True, default=0)
    date = models.DateField()
    pickup = models.BooleanField()
    details = models.TextField(blank=True, max_length=300)
    car = models.ForeignKey(Car, on_delete=models.DO_NOTHING)
    buyer = models.ForeignKey(Buyer, on_delete=models.DO_NOTHING)

    def __str__(self):
        return str(self.id) + ' ' + str(self.car) + ' ' + str(self.buyer)

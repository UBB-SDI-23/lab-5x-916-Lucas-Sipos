from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from cars.application.models import Car, Buyer


class StatisticsViewTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()

        Car.objects.create(model="Test1", year=2000, fuel_type="G", cc="2.0", hp=100, transmission_type="M")
        Car.objects.create(model="Test2", year=2010, fuel_type="D", cc="3.0", hp=150, transmission_type="A")
        Car.objects.create(model="Test3", year=2020, fuel_type="E", cc="N/A", hp=300, transmission_type="C")

        Buyer.objects.create(first_name="John", last_name="Doe", age=25, sex="M", car=Car.objects.get(id=1))
        Buyer.objects.create(first_name="Jane", last_name="Doe", age=35, sex="F", car=Car.objects.get(id=2))
        Buyer.objects.create(first_name="Bob", last_name="Smith", age=45, sex="M", car=Car.objects.get(id=3))

    def test_young_drivers(self):
        url = '/statistics/1/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, {
            "status": "success",
            "young_drivers": {
                1: {
                    "age": 25,
                    "first_name": "John",
                    "last_name": "Doe",
                    "model": "Test1",
                    "year": 2000
                },
                2: {
                    "age": 35,
                    "first_name": "Jane",
                    "last_name": "Doe",
                    "model": "Test2",
                    "year": 2010
                }
            }
        })

    def test_old_but_young_heart(self):
        url = '/statistics/2/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, {
            "status": "success",
            "old_but_young_heart": {
                1: {
                    "age": 45,
                    "first_name": "Bob",
                    "last_name": "Smith",
                    "model": "Test3",
                    "transmission_type": "C"
                }
            }
        })

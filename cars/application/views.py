from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .models import Car, Buyer, DeliveryService
from .serializers import CarSerializer, BuyerSerializer, DeliverySerializer
from rest_framework.response import Response
from rest_framework import status


class CarList(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.__queryset = Car.objects.all()
        self.__serializer_class = CarSerializer

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    def get(self, request, id=None):
        if id:
            entity = self.__queryset.get(id=id)
            serializer = self.__serializer_class(entity)

            buyers = Buyer.objects.all().filter(car=entity.id)
            buyers_serializer = BuyerSerializer(buyers, many=True)
            return Response({"status": "success", "cars": serializer.data, "buyers": buyers_serializer.data},
                            status=status.HTTP_200_OK)
        year = request.query_params.get('year', None)
        if year:
            self.__queryset = self.__queryset.filter(year__gte=year)
        items = self.__queryset
        serializer = self.__serializer_class(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, id=False):
        if id:
            data = request.data
            datastr = data['data']
            datastr = datastr.split(",")
            for datas in datastr:
                cast = int(datas)
                if Buyer.objects.get(id=cast):
                    serializer = Buyer.objects.all()
                    Buyer.objects.create(first_name=serializer.get(id=cast).first_name,
                                         last_name=serializer.get(id=cast).last_name,
                                         age=serializer.get(id=cast).age, sex=serializer.get(id=cast).sex,
                                         car_id=id)
            return Response({"status": "success", "serializer": ""},
                            status=status.HTTP_201_CREATED)
        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id=None):
        item = self.__queryset.get(id=id)
        serializer = self.__serializer_class(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        if not id:
            return Response({"status": "error", "data": "ID not specified"}, status=status.HTTP_400_BAD_REQUEST)
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item deleted"}, status=status.HTTP_200_OK)


class BuyerList(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.__queryset = Buyer.objects.all()
        self.__serializer_class = BuyerSerializer

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    def get(self, request, id=None):
        if id:
            car = self.__queryset.get(id=id)
            serializer = self.__serializer_class(car)
            cars = Car.objects.all().filter(id=car.car_id)
            cars_serializer = CarSerializer(cars, many=True)
            return Response({"status": "success", "buyers": serializer.data, "cars": cars_serializer.data},
                            status=status.HTTP_200_OK)
        items = self.__queryset
        serializer = self.__serializer_class(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id=None):
        item = self.__queryset.get(id=id)
        serializer = self.__serializer_class(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        if not id:
            return Response({"status": "error", "data": "ID not specified"}, status=status.HTTP_400_BAD_REQUEST)
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item deleted"}, status=status.HTTP_200_OK)


class DeliveryList(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.__queryset = DeliveryService.objects.all()
        self.__serializer_class = DeliverySerializer

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    def get(self, request, id=None):
        if id:
            car = self.__queryset.get(id=id)
            serializer = self.__serializer_class(car)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        items = self.__queryset
        serializer = self.__serializer_class(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id=None):
        item = self.__queryset.get(id=id)
        serializer = self.__serializer_class(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        if not id:
            return Response({"status": "error", "data": "ID not specified"}, status=status.HTTP_400_BAD_REQUEST)
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item deleted"}, status=status.HTTP_200_OK)


class CarToBuyer(APIView):
    def _init_(self, **kwargs):
        super().__init__(**kwargs)

        self.__model = DeliveryService
        self.__queryset = self.__model.objects.all()
        self.__serializer_class = DeliverySerializer

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    def get(self, request, car_id=None, buyer_id=None):
        items = DeliveryService.objects.all().filter(**request.GET.dict())

        if str(request)[str(request).find('\'') + 2] == 'c':
            items = items.filter(car=car_id)
            if buyer_id:
                items = items.filter(buyer=buyer_id)
            entities = []
            for item in items:
                entities.append(Buyer.objects.get(id=item.buyer.id))
            serializer = BuyerSerializer(entities, many=True)
        elif str(request)[str(request).find('\'') + 2] == 'b':
            items = items.filter(buyer=buyer_id)
            if car_id:
                items = items.filter(car=car_id)
            entities = []
            for item in items:
                entities.append(Car.objects.get(id=item.car.id))
            serializer = CarSerializer(entities, many=True)
        else:
            serializer = self.__serializer_class(items, many=True)

        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def patch(self, request, id=None):
        item = self.__queryset.get(id=id)
        serializer = self.__serializer_class(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        if not id:
            return Response({"status": "error", "data": "No id specified, no action was performed"},
                            status=status.HTTP_400_BAD_REQUEST)
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item Deleted"}, status=status.HTTP_200_OK)


class StatisticsView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__stats = {
            1: self.__young_drivers,
            2: self.__old_but_young_heart,
        }

    @staticmethod
    def __young_drivers(request):
        buyers = Buyer.objects.all().order_by('age').filter(age__lte=40)
        response = {}
        i = 0
        for buyer in buyers:
            i += 1
            response[i] = {
                "age": buyer.age,
                "first_name": buyer.first_name,
                "last_name": buyer.last_name,
                "model": buyer.car.model,
                "year": buyer.car.year,
            }
        return Response({"status": "success", "young_drivers": response}, status=status.HTTP_200_OK)

    @staticmethod
    def __old_but_young_heart(request):
        buyers = Buyer.objects.all().filter(age__gte=30).order_by('age')
        response = {}
        i = 0
        for buyer in buyers:
            if buyer.car.transmission_type != "A":
                i += 1
                response[i] = {
                    "age": buyer.age,
                    "first_name": buyer.first_name,
                    "last_name": buyer.last_name,
                    "model": buyer.car.model,
                    "transmission_type": buyer.car.transmission_type,
                }
        return Response({"status": "success", "old_but_young_heart": response}, status=status.HTTP_200_OK)

    def get(self, request, id=None):
        if not id or id not in self.__stats:
            return Response({"status": "error", "available keys": self.__stats.keys()},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            return self.__stats[id](request)

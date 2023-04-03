from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


urlpatterns = [
    path('cars/', CarList.as_view()),
    path('cars/<int:id>/', CarList.as_view()),
    path('cars/<int:id>/add-buyer/', CarList.as_view()),

    path('buyers/', BuyerList.as_view()),
    path('buyers/<int:id>/', BuyerList.as_view()),

    path('delivs/', DeliveryList.as_view()),
    path('delivs/<int:id>/', DeliveryList.as_view()),

    path('statistics/', StatisticsView.as_view()),
    path('statistics/<int:id>/', StatisticsView.as_view()),

    path("cars/<int:car_id>/buyers/", CarToBuyer.as_view()),
    path("cars/<int:car_id>/buyers/<int:buyer_id>/", CarToBuyer.as_view()),
    path("buyers/<int:buyer_id>/cars/", CarToBuyer.as_view()),
    path("buyers/<int:buyer_id>/cars/<int:car_id>/", CarToBuyer.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

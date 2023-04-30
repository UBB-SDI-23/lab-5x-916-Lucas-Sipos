from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


urlpatterns = [
    path('cars/', CarList.as_view()),
    path('cars/<int:page>/', CarList.as_view()),
    path('cars/<int:more>/add-buyer/', CarList.as_view()),
    path('cars/<str:car_name>/', CarListModel.as_view()),

    path('buyers/', BuyerList.as_view()),
    path('buyers/<int:page>/', BuyerList.as_view()),
    path('buyers/<str:buyer_name>/', BuyerListName.as_view()),

    path('delivs/', DeliveryList.as_view()),
    path('delivs/<int:page>/', DeliveryList.as_view()),

    path('statistics/', StatisticsView.as_view()),
    path('statistics/<int:id>/', StatisticsView.as_view()),
    path('statistics/<int:id>/<int:page>', StatisticsView.as_view()),

    path("cars/<int:car_id>/buyers/", CarToBuyer.as_view()),
    path("cars/<int:car_id>/buyers/<int:buyer_id>/", CarToBuyer.as_view()),
    path("buyers/<int:buyer_id>/cars/", CarToBuyer.as_view()),
    path("buyers/<int:buyer_id>/cars/<int:car_id>/", CarToBuyer.as_view()),

    path('company/', CompanyList.as_view()),
    path('company/<int:page>/', CompanyList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

from django.urls import path, include
from rest_framework import routers

from compounds.views import CompoundViewSet

router = routers.DefaultRouter()

router.register(r'compounds', CompoundViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
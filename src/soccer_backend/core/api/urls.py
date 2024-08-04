from django.urls import path, include
from rest_framework import routers

from core.api.viewsets import PlayerViewSet

app_name = 'core'

router = routers.DefaultRouter()
router.register(r'player', PlayerViewSet, basename='player')

urlpatterns = [
    path('core/', include(router.urls)),
]

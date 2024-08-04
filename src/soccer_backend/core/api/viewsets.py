from core.api.serializers import PlayerSerializer
from core.models import Player
from rest_framework import viewsets


class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer

    def get_queryset(self):
        nickname = self.request.query_params.get('nickname', None)

        if nickname is not None:
            return Player.objects.filter(user__username__iexact=nickname)
        else:
            return Player.objects.filter(user__username__iexact=self.request.user.get_username())

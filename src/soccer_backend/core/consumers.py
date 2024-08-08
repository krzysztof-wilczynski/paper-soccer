import json
import time
import uuid

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from core.models import Player


class LobbyConsumer(AsyncWebsocketConsumer):
    group_name = 'lobby'
    players = []

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.player = None

    def get_player(self):
        return Player.objects.get(user_id=self.scope['user'])

    async def connect(self):
        self.player = await database_sync_to_async(self.get_player)()
        await self.accept()

        self.players.append(self.player)

        await self.channel_layer.group_add(
            self.group_name, self.channel_name
        )

        await self.channel_layer.group_send(
            self.group_name,
            {"type": "lobby:join", "message": len(self.players)}
        )

    async def receive(self, text_data=None, binary_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(text_data_json)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name
        )

    async def queue_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

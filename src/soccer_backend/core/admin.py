from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from core.models import User, Player, Match

admin.site.register(User, UserAdmin)
admin.site.register(Player)
admin.site.register(Match)

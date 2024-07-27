from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


# Create your models here.
class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=1500)
    deviation = models.IntegerField(default=350)
    volatility = models.FloatField(default=0.06)

    def __str__(self):
        return f'{self.user.get_username()}'


class Match(models.Model):
    playerA = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='playerA')
    playerB = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='playerB')
    winner = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='winner')
    date = models.DateTimeField(auto_now_add=True)
    course = models.TextField()

    def __str__(self):
        return f'{str(self.playerA)} vs {str(self.playerB)} @ {str(self.date)}'

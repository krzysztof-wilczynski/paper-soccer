from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from core.models import User, Player


@receiver(post_save, sender=User)
def create_player(sender, instance, created, **kwargs):
    if created:
        Player.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_player(sender, instance, **kwargs):
    instance.player.save()

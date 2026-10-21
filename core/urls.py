from django.urls import path
import core.views

urlpatterns = [
    path('', core.views.index, name='index'),
    path('anuncios/criar/', core.views.create_ad, name='create_ad'),
]
from django.urls import path
from django.conf.urls import url, include

from . import views

urlpatterns = [
    path('', views.ArticleList.as_view()),
    path('/<int:pk>', views.ArticleDetails.as_view())
]
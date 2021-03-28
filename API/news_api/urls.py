from django.conf.urls import include, url
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token


schema_view = get_schema_view(
   openapi.Info(
      title="News API",
      default_version="v1",
      description="News API created with Django REST"
   ),
   public=True,
   permission_classes=[permissions.AllowAny]
)

urlpatterns = [
   url(r"^swagger/$", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
   url(r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
   url("api/article", include("article.urls")),
   url("api-token-auth/", obtain_auth_token, name="api_token_auth")
]
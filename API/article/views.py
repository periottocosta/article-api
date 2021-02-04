from django.http.response import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from .models import Article
from .serializers import ArticleSerializer


class ArticleDetails(APIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated, )

    def _get_article(self, pk):
        try:
            return Article.objects.values("articleBody", "articleId", "category", "createDate", "imageLink", "introText", "mainArticle", "title", "updateDate").get(articleId=pk)
        except Article.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """Get article by ID

        **Example response**:

            {
                "articleId": 2,
                "title": "Didi Kuaidi",
                "category": "TECH",
                "imageLink": "https://image.jpg",
                "introText": "One day after Uber.",
                "createDate": "2021-01-20T01:40:01.144959Z",
                "updateDate": "2021-01-25T20:10:41.946761Z",
                "mainArticle": false,
                "articleBody": "body"
            }      
        """
        
        article = self._get_article(pk=pk)
        serializer = self.serializer_class(article)

        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def put(self, request, pk):
        """Update article info

        **Example response**:

            //new infos 
            {
                "articleId": 2,
                "title": "Didi Kuaidi",
                "category": "TECH",
                "imageLink": "https://image.jpg",
                "introText": "One day after Uber.",
                "createDate": "2021-01-20T01:40:01.144959Z",
                "updateDate": "2021-01-25T20:10:41.946761Z",
                "mainArticle": false,
                "articleBody": "body"
            }      
        """
        
        article = Article.objects.get(pk=pk)
        serializer = self.serializer_class(article, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        article = Article.objects.get(pk=pk)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArticleList(APIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated, )
    pagination_class = PageNumberPagination

    @property
    def paginator(self):
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator
    
    def paginate_queryset(self, queryset):
        
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get (self, request):
        """Get all articles

        **Example response**:

            [
                {
                    "articleId": 2,
                    "title": "Didi Kuaidi",
                    "category": "TECH",
                    "imageLink": "https://image.jpg",
                    "introText": "One day after Uber.",
                    "createDate": "2021-01-20T01:40:01.144959Z",
                    "updateDate": "2021-01-25T20:10:41.946761Z",
                    "mainArticle": false,
                    "articleBody": "body"
                }
            ]
        """

        query = Article.objects.all().values("articleId", "category", "createDate", "imageLink", "introText", "mainArticle", "title", "updateDate").order_by("-updateDate")
        page = self.paginate_queryset(query)
        
        if page is not None:
            serializer = self.get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(query, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Save new article

        **Example response**:

            //new article info 
            {
                "articleId": 2,
                "title": "Didi Kuaidi",
                "category": "TECH",
                "imageLink": "https://image.jpg",
                "introText": "One day after Uber.",
                "createDate": "2021-01-20T01:40:01.144959Z",
                "updateDate": "2021-01-25T20:10:41.946761Z",
                "mainArticle": false,
                "articleBody": "body"
            }      
        """
        
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
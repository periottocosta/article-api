# -*- coding: utf-8 -*-
from django.db import models

class Article(models.Model):
    articleId = models.AutoField(primary_key=True)
    title = models.CharField(null=False, blank=False, max_length=255)
    category = models.CharField(null=False, blank=False, max_length=255)
    imageLink = models.CharField(null=False, blank=False, max_length=255)
    introText = models.CharField(null=False, blank=False, max_length=255)
    createDate = models.DateTimeField(auto_now_add=True)
    updateDate = models.DateTimeField(auto_now=True)
    mainArticle = models.BooleanField(default=False)
    articleBody = models.TextField(null=True, blank=False)

    def save(self, *args, **kwargs):
        if self.mainArticle:
            try:
                temp = Article.objects.get(mainArticle=True)
                if self != temp:
                    temp.mainArticle = False
                    temp.save()
            except Article.DoesNotExist:
                pass
        super(Article, self).save(*args, **kwargs)

    class Meta:
        db_table = "article"
        verbose_name = 'Artigo'
        verbose_name_plural = 'Artigos'
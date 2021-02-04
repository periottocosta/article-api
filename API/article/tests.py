from rest_framework import status
from rest_framework.test import APITestCase


class ArticleTestCase(APITestCase):
    def _save_article(self):
        data = {
            'title': 'title',
            'articleId': 'articleId',
            'category': 'sports',
            'imageLink': 'imageLink',
            'introText': 'introText',
            'articleBody': 'articleBody'
        }

        return self.client.post('/api/article', data)
    
    def test_get_all_articles(self):
        response = self.client.get('/api/article')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

    def test_save_article(self):
        data = {
            'title': 'title',
            'articleId': 'articleId',
            'category': 'sports',
            'imageLink': 'imageLink',
            'introText': 'introText',
            'articleBody': 'articleBody'
        }

        response = self.client.post('/api/article', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_update_article(self):
        response = self._save_article()
        article_id = response.data['articleId']
        data = {
            'title': 'title2',
            'category': 'sports',
            'articleId': 'articleId',
            'imageLink': 'imageLink',
            'introText': 'introText',
            'articleBody': 'articleBody'
        }

        response = self.client.put('/api/article/'+str(article_id), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_article(self):
        response = self._save_article()
        article_id = response.data['articleId']
        response = self.client.delete('/api/article/'+str(article_id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
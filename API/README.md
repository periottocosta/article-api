# News API

News API develop with Django REST

## Development

To start with development just run the following commands:

```bash
#install dependencies
pip install requirements.txt

#migrations
python manage.py makemigrations
python manage.py migrate

#create a suoeruser 
#get the token code and update postman coollection file
python manage.py createsuperuser --username Gabriel --email teste@gmail.com

#run local server
python manage.py runserver

#run local tests
python manage.py test
```

## Deploy

After make a pull request and all github actions return with 0 errors, approve the pull request and Heroku execute deploy

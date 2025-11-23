from django.urls import path
from core.views import index, about, author_login, author_logout, author_dashboard, create_blog

urlpatterns = [
    path('', index, name="index"),
    path('about/', about, name='about'),
    path('login/', author_login, name='login'),
    path('logout/', author_logout, name='logout'),
    path('dashboard/', author_dashboard, name='dashboard'),
    path('create-blog/', create_blog, name='create_blog'),
]


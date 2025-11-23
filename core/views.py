from django.shortcuts import render
from blog.models import BlogPost, Author


def index(request):
    authors = Author.objects.filter(email="rahul@gmail.com")
    if authors.exists():
        author = authors.first()
        posts = author.blog_posts.filter(title="test1")
        print(posts)
        print(posts.first().author.first_name)

    else:
        posts = {}

    return render(request, 'blog/index.html', context={"posts": posts})


def about(request):
    return render(request, 'blog/about.html')

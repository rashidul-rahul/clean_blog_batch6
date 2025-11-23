from django.db import models


BLOGPOSTCHOICES = [
    ["draft", "Draft"],
    ["published", "Published"],
    ["unpublished", "Unpublished"]
]


class Author(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64, blank=True, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email


class BlogPost(models.Model):
    title = models.CharField(max_length=512)
    sub_title = models.CharField(max_length=512)
    image = models.ImageField(upload_to='blog_images/')
    description = models.TextField(default="This is a description field")
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name="blog_posts",
    )
    status = models.CharField(max_length=30, choices=BLOGPOSTCHOICES, default="draft")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def author_name(self):
        return self.author.first_name

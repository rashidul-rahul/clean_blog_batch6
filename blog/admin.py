from django.contrib import admin
from blog.models import BlogPost, Author


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'author_name', 'created_at',)
    list_filter = ('status',)
    search_fields = ('title', 'description',)
    raw_id_fields = ('author',)


class AuthorAdmin(admin.ModelAdmin):
    search_fields = ('email', 'first_name',)


admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Author, AuthorAdmin)

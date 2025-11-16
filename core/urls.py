from django.urls import path
from core.views import index, about


urlpatterns = [
    path('', index, name="index"),
    path('about/', about, name='about')
]


######### project planing ########

# 1. BlogPost (id, title, sub title, image, description, author, created_at, updated_at )
# 2. Contact us (name, email address, phone_no, message)
# 3. Author (id, first_name, last_name, email, password, created_at, updated_at)
# 4. SiteInfo (title, sub_title, index_page_image, copyright_text)
# 5. SocialIcons (Name, Icon, Url, created_at, updated_at, Site_info)

# Note: User Login system
# Register system.
# Rich/ckeditor system

### Optional: 1. Comments. 2. Like

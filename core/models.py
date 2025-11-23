from django.db import models


class SiteInfo(models.Model):
    title = models.CharField(max_length=220)
    sub_title = models.CharField(max_length=220, default="subtitle")
    index_page_image = models.ImageField(upload_to='site_images/')
    copyright_text = models.CharField(max_length=200)

    def __str__(self):
        return self.title[:20]


class SocialIcon(models.Model):
    name = models.CharField(max_length=120)
    url = models.URLField()
    site_info = models.ForeignKey(
        SiteInfo,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

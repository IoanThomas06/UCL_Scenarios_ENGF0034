from django.contrib import admin
from .models import Person, BookInfo, BookItem, Borrows
# Register your models here.

admin.site.register(Person)
admin.site.register(BookInfo)
admin.site.register(BookItem)
admin.site.register(Borrows)
# This code registers the models with the admin site, so that they can be viewed and edited through the admin interface.
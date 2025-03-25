from django.urls import path
from . import views

urlpatterns = [
    path('create-person/', views.create_person, name='create_person'),
    path('update-credit/<str:email>/', views.update_credit, name='update_credit'),
    path('borrow-book/', views.borrow_book, name='borrow_book'),
    path('update-return-date/<int:borrow_id>/', views.update_return_date, name='update_return_date'),
    
    # New URLs for books and items
    path('create-bookinfo/', views.create_bookinfo, name='create_bookinfo'),
    path('create-bookitem/', views.create_bookitem, name='create_bookitem'),
    path('update-bookitem-condition/<int:bookitem_id>/', views.update_bookitem_condition, name='update_bookitem_condition'),

    path('get_books/', views.get_books, name='get_books'),

]

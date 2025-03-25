from django.urls import path
from . import views

urlpatterns = [
    path('create-person/', views.create_person, name='create_person'),
    path('update-credit/<str:email>/', views.update_credit, name='update_credit'),
    path('borrow-book/', views.borrow_book, name='borrow_book'),
    path('update-return-date/<int:borrow_id>/', views.update_return_date, name='update_return_date'),
    path('create-bookinfo/', views.create_bookinfo, name='create_bookinfo'),
    path('create-bookitem/', views.create_bookitem, name='create_bookitem'),
    path('update-bookitem-condition/<int:bookitem_id>/', views.update_bookitem_condition, name='update_bookitem_condition'),

    path('get_books/', views.get_books, name='get_books'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),

    path('get-book-items-by-isbn/<str:isbn>/', views.get_book_items_by_isbn, name='get_book_items_by_isbn'),
    path('get-borrows-by-ucl-email/<str:ucl_email>/', views.get_borrows_by_ucl_email, name='get_borrows_by_ucl_email'),
]

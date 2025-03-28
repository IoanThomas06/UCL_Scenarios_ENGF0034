from django.shortcuts import render, get_object_or_404, redirect
from .forms import PersonForm, BorrowBookForm, BookInfoForm, BookItemForm, BookItemConditionForm
from .models import Person, Borrows, BookItem, BookInfo
import datetime
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import BookItemSerializer, BorrowItemSerializer
from django.db.models import Q
import random
from urllib.parse import urlencode
from django.shortcuts import redirect
import requests


UCL_CLIENT_ID = '0736577201550487.7239394091035845'
UCL_CLIENT_SECRET = 'e02ff5cb24f7e9b4930d94c31d068ea3d6173c488161f6120c2b0587607551ad'




@api_view(['GET'])
def get_books(request):
    search_query = request.query_params.get('search', '')
    if search_query:
        # Filter books if search query is not empty
        books = BookItem.objects.filter(
            Q(isbn__title__icontains=search_query) |
            Q(isbn__author__icontains=search_query) |
            Q(isbn__isbn__icontains=search_query)
        )
    else:
        # Return all books if search query is empty
        books = BookItem.objects.all()
    serializer = BookItemSerializer(books, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_books_borrowed(request):
    email = request.query_params.get('email', '')
    books = Borrows.objects.filter(person__ucl_email=email)
    serializer = BorrowItemSerializer(books, many=True, context={'request': request})
    return Response(serializer.data)

def login(request):
    oauth_base_url = "https://uclapi.com/oauth/authorise"
    params = {
        'client_id': UCL_CLIENT_ID, 
        'state': str(random.randint(0, 1000000)),
    }
    auth_url = f"{oauth_base_url}?{urlencode(params)}"
    return redirect(auth_url)

def oauth_callback(request):
    code = request.GET.get('code')
    result = request.GET.get('result')
    state = request.GET.get('state')
    if code:
        response = requests.get('https://uclapi.com/oauth/token', params={
            'client_id': UCL_CLIENT_ID,
            'client_secret': UCL_CLIENT_SECRET,
            'code': code
        })
        if response.ok:
            token = response.json()['token']
            data = requests.get("https://uclapi.com/oauth/user/data", params={
                'client_secret': UCL_CLIENT_SECRET,
                'token': token,
            })
            if data.ok:
                email = data.json()['email']
                params = {
                    'email': email,
                }
                create_person(email)
                callback_frontend = f"http://localhost:5173/callback?{urlencode(params)}"
                return redirect(callback_frontend)  # Frontend URL
    return redirect('http://localhost:5173/login?error=auth_failed')

def create_person(email):
    try:
        person, created = Person.objects.get_or_create(
            ucl_email=email,
            defaults={
                'credit': 200  # Default credit for new users
            }
        )
        if created:
            print(f"Created new person with email: {email}")
        else:
            print(f"Person with email {email} already exists")
        return
    except Exception as e:
        print(f"Error creating person: {str(e)}")
        return None



# View for updating Person's credit
def update_credit(request, email):
    person = get_object_or_404(Person, ucl_email=email)
    if request.method == 'POST':
        new_credit = request.POST.get('credit')
        person.credit = int(new_credit)
        person.save()
        return redirect('person_detail', email=email)

    return render(request, 'update_credit.html', {'person': person})


# View for borrowing a book
def borrow_book(request):
    if request.method == 'POST':
        form = BorrowBookForm(request.POST)
        if form.is_valid():
            borrow = form.save(commit=False)
            borrow.start_date = datetime.date.today()
            borrow.save()

            # Update the BookItem condition to "Borrowed"
            book_item = borrow.book_item
            book_item.condition = 'Borrowed'
            book_item.save()

            return redirect('borrow_success')

    else:
        form = BorrowBookForm()

    return render(request, 'borrow_book.html', {'form': form})


# View for updating the return date of a borrowed book
def update_return_date(request, borrow_id):
    borrow = get_object_or_404(Borrows, id=borrow_id)

    if request.method == 'POST':
        return_date = request.POST.get('returned_date')
        borrow.returned_date = return_date
        borrow.save()

        # Update the BookItem condition to "Available"
        book_item = borrow.book_item
        book_item.condition = 'Available'
        book_item.save()

        return redirect('borrow_success')

    return render(request, 'update_return_date.html', {'borrow': borrow})


# View for creating a new BookInfo record
def create_bookinfo(request):
    if request.method == 'POST':
        form = BookInfoForm(request.POST)
        if form.is_valid():
            form.save()  # Save the new book info
            return redirect('bookinfo_list')  # Redirect to the book info list page
    else:
        form = BookInfoForm()

    return render(request, 'create_bookinfo.html', {'form': form})


# View for creating a new BookItem record
def create_bookitem(request):
    if request.method == 'POST':
        form = BookItemForm(request.POST)
        if form.is_valid():
            form.save()  # Save the new book item
            return redirect('bookitem_list')  # Redirect to the book item list page
    else:
        form = BookItemForm()

    return render(request, 'create_bookitem.html', {'form': form})


# View for updating a BookItem's condition
def update_bookitem_condition(request, bookitem_id):
    bookitem = get_object_or_404(BookItem, id=bookitem_id)
    if request.method == 'POST':
        form = BookItemConditionForm(request.POST, instance=bookitem)
        if form.is_valid():
            form.save()  # Update the book item condition
            return redirect('bookitem_detail', bookitem_id=bookitem.id)

    else:
        form = BookItemConditionForm(instance=bookitem)

    return render(request, 'update_bookitem_condition.html', {'form': form, 'bookitem': bookitem})

# Function to query BookItem entries by ISBN
@api_view(['GET'])
def get_book_items_by_isbn(request, isbn):
    book_items = BookItem.objects.filter(isbn__isbn=isbn)
    serializer = BookItemSerializer(book_items, many=True, context={'request': request})
    return Response(serializer.data)

# Function to query Borrows entries by UCL email
@api_view(['GET'])
def get_borrows_by_ucl_email(request, ucl_email):
    person = get_object_or_404(Person, ucl_email=ucl_email)
    borrows = Borrows.objects.filter(person=person)
    borrows_data = [
        {
            'book_item_id': borrow.book_item.id,
            'start_date': borrow.start_date,
            'end_date': borrow.end_date,
            'returned_date': borrow.returned_date
        }
    for borrow in borrows]
    return JsonResponse(borrows_data, safe=False)
from django.shortcuts import render, get_object_or_404, redirect
from .forms import PersonForm, BorrowBookForm, BookInfoForm, BookItemForm, BookItemConditionForm
from .models import Person, Borrows, BookItem, BookInfo
import datetime


# View for creating a new Person
def create_person(request):
    if request.method == 'POST':
        form = PersonForm(request.POST)
        if form.is_valid():
            form.save()  # Save the new person to the database
            return redirect('person_list')  # Redirect to a person list page
    else:
        form = PersonForm()

    return render(request, 'create_person.html', {'form': form})


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

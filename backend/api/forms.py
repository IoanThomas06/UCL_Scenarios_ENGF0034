from django import forms
from .models import Person, Borrows, BookItem, BookInfo


# Form for creating a new Person
class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ['ucl_email', 'credit']


# Form for borrowing a book
class BorrowBookForm(forms.ModelForm):
    class Meta:
        model = Borrows
        fields = ['person', 'book_item', 'end_date']

    person = forms.ModelChoiceField(queryset=Person.objects.all())
    book_item = forms.ModelChoiceField(queryset=BookItem.objects.filter(condition='Available'))


# Form for creating a new BookInfo
class BookInfoForm(forms.ModelForm):
    class Meta:
        model = BookInfo
        fields = ['isbn', 'title', 'author', 'publisher', 'publish_date']


# Form for creating a new BookItem
class BookItemForm(forms.ModelForm):
    class Meta:
        model = BookItem
        fields = ['isbn', 'condition']


# Form for updating a BookItem's condition
class BookItemConditionForm(forms.ModelForm):
    class Meta:
        model = BookItem
        fields = ['condition']

    CONDITION_CHOICES = [
        ('Perfect', 'Perfect'),
        ('Good', 'Good'),
        ('Poor', 'Poor'),
        ('Damaged', 'Damaged')
    ]

    condition = forms.ChoiceField(choices=CONDITION_CHOICES)

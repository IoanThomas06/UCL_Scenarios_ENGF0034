from django.db import models

class Person(models.Model):
    ucl_email = models.CharField(max_length=50)  
    credit = models.IntegerField()

    def __str__(self):
        return self.ucl_email
    

class BookInfo(models.Model):
    isbn = models.CharField(max_length=20) 
    title =  models.CharField(max_length=100)
    author = models.CharField(max_length=20)
    publisher = models.CharField(max_length=50)
    publish_date = models.DateField()  
    image = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return self.isbn
    

class BookItem(models.Model):
    isbn = models.ForeignKey(BookInfo, on_delete=models.CASCADE)
    condition = models.CharField(max_length=20) 

    def __str__(self):
        return str(self.id)
    

class Borrows(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)  
    book_item = models.ForeignKey(BookItem, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    returned_date = models.DateField(null=True)

    def __str__(self):
        return self.person + "," + self.book_item + "," + self.start_date
    
from rest_framework import serializers
from .models import BookItem, BookInfo, Borrows

class BookInfoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = BookInfo
        fields = ['title', 'author', 'isbn', 'image_url']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None

class BookItemSerializer(serializers.ModelSerializer):
    book_info = BookInfoSerializer(source = 'isbn', read_only=True)

    class Meta:
        model = BookItem
        fields = ['id', 'book_info', 'condition']

class BorrowItemSerializer(serializers.ModelSerializer):
    book_item = BookItemSerializer( read_only=True)
    class Meta:
        model = Borrows
        fields = ['person', 'book_item', 'start_date', 'end_date', 'returned_date']
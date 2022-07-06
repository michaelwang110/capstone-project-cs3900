from rest_framework import serializers

from app.models import (
    CollectionLists,
    Users,
    Books,
    Reads,
    Reviews,
    Authors,
    WrittenBy,
    Collections,
    Contains
)

class CollectionListSerializer(serializers.ModelSerializer):

    class Meta:
        model = CollectionLists
        fields = (
            'id', 
        )

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = (
            'id', 'name', 'email', 'username', 'collection_list', 
        )

class BookSerializer(serializers.ModelSerializer):

    publication_date = serializers.DateField(
        format="%b %d, %Y", 
        input_formats=["%b %d, %Y", 'iso-8601'], 
        allow_null=True
    )

    class Meta:
        model = Books
        fields = (
            'id', 'book_title', 'book_synopsis', 'book_publisher',
            'publication_date', 'genre', 'average_rating',
        )

class ReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reads
        fields = (
            'id', 'user', 'book',
        )

class ReviewSerializer(serializers.ModelSerializer):

    date = serializers.DateField(
        format="%b %d, %Y", 
        input_formats=["%b %d, %Y", 'iso-8601'], 
        allow_null=True
    )

    class Meta:
        model = Reviews
        fields = (
            'id', 'user', 'book', 'review', 'rating', 'date',
        )

class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Authors
        fields = (
            'id', 'author_name',
        )

class WrittenBySerializer(serializers.ModelSerializer):

    class Meta:
        model = WrittenBy
        fields = (
            'id', 'book', 'author',
        )

class CollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collections
        fields = (
            'id', 'collection_type', 'is_private', 
            'description', 'collection_name', 
            'collection_list',
        )

class ContainSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contains
        fields = (
            'id', 'collection', 'book',
        )


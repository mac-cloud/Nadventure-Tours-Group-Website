from django.db import models
from django.contrib.auth.models import User
from django.contrib.gis.db import models as gis_models

class Guide(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)  # Consider using hashed password
    address = models.TextField()
    experience = models.PositiveIntegerField()
    country = models.TextField(default='Kenya')
    location = gis_models.PointField(null=True, blank=True)
    qualifications = models.TextField()
    relevant_certificate = models.FileField(upload_to='certificates/')
    clearance_certificate = models.FileField(upload_to='certificates/')
    licenses = models.FileField(upload_to='licenses/')
    id_proof = models.FileField(upload_to='id_proofs/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.first_name} {self.status}"


class GuideBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    guide = models.ForeignKey(Guide, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} -> {self.guide.name} at {self.location}"
#newsletter

class Newsletter(models.Model):
    name = models.TextField(max_length=100)
    email = models.EmailField(unique=True) 
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
    


#packages 

class Location(models.Model):
    location_name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.location_name

class Tour(models.Model):
    location = models.ForeignKey(Location, related_name='tours', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price_range = models.CharField(max_length=50)
    days = models.PositiveIntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='tours/')


class Hotel(models.Model):
    tour = models.ForeignKey(Tour, related_name='hotels', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

class Activity(models.Model):
    tour = models.ForeignKey(Tour, related_name='activities', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

class Review(models.Model):
    tour = models.ForeignKey(Tour, related_name='review', on_delete=models.CASCADE)
    user = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()

    
class TourGuideConnection(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='guide_connections')
    guide = models.ForeignKey(Guide, on_delete=models.CASCADE, related_name='tour_connections')

    def __str__(self):
        return f"{self.tour.name} - {self.guide.first_name}"
    


#bookingfor package info

class BookingAppointment(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    tour_package_id = models.PositiveIntegerField()
    tour_name = models.CharField(max_length=255)
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.tour_name}"


class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')

    def __str__(self):
        return self.title
    

class Blog(models.Model):
    CATEGORY_CHOICES = [
       ( 'Adventure', 'Adventure'),
       ( 'wildlife', 'Wildlife'),
       ( 'MountainTrek', 'MountainTrek'),
    ]

    title = models.CharField(max_length=200)
    date = models.DateField()
    excerpt = models.TextField()
    link = models.URLField()
    image = models.ImageField(upload_to='blog_images/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.title


class Story(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    year_founded = models.CharField(max_length=4)


class StoryVideo(models.Model):
    story = models.ForeignKey(Story, related_name='videos', on_delete=models.CASCADE)
    url = models.URLField()


class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='country_images/')

    def __str__(self):
        return self.name

class CountryDescription(models.Model):
    country = models.ForeignKey(Country, related_name='descriptions', on_delete=models.CASCADE)
    text = models.TextField()

class CountyInfo(models.Model):   
    country = models.ForeignKey(Country, related_name='county_info', on_delete=models.CASCADE) 
    county_name = models.CharField(max_length=100)
    info = models.TextField()
    image = models.ImageField(upload_to='county_images/', null=True, blank=True) 

    def __str__(self):
        return f"{self.county_name} ({self.country.name})"       

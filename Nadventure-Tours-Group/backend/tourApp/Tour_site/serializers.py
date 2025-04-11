from ctypes.wintypes import POINT
from rest_framework import serializers 
from .models import Guide, Newsletter, Tour, Story, StoryVideo, Location,Country,CountryDescription,CountyInfo, Activity,Hotel, Review, TourGuideConnection, Blog,BookingAppointment, Service
from rest_framework_gis.serializers import GeoFeatureModelSerializer
class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = '__all__'

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'  


class LocationSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Location
        fields = ['name']

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['name']

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['name']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review 
        fields = ['rating', 'user', 'comment'] 


class TourSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(source='location.location_name')
    hotels = HotelSerializer(many=True, read_only=True)
    activities = ActivitySerializer(many=True, read_only=True)
    review = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Tour
        fields = fields = ['id', 'name', 'description', 'price_range', 'days', 'category', 'activities', 'hotels', 'location_name']      


class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = '__all__'
        #read_only_fields = ['password']  # Security best practice

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Add distance calculation if context contains request
        if hasattr(self.context.get('request'), 'GET'):
            tour_location = self.context['request'].GET.get('tour_location')
            if tour_location:
                try:
                    # Parse location from GET parameter (format: longitude,latitude)
                    lon, lat = map(float, tour_location.split(','))
                    guide_point = instance.location
                    tour_point = POINT(lon, lat)
                    
                    # Calculate distance in kilometers
                    distance = guide_point.distance(tour_point) / 1000
                    ret['distance_from_tour'] = round(distance, 2)
                except Exception as e:
                    pass  # Ignore invalid location parameters
        return ret

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'

class TourGeoSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'
        geo_field = 'location'

class TourGuideConnectionSerializer(serializers.ModelSerializer):
    tour = TourSerializer(read_only=True)
    guide = GuideSerializer(read_only=True)
    
    class Meta:
        model = TourGuideConnection
        fields = ['id', 'tour', 'guide', 'created_at']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        tour_id = self.context['request'].data.get('tour_id')
        guide_id = self.context['request'].data.get('guide_id')
        
        try:
            tour = Tour.objects.get(id=tour_id)
            guide = Guide.objects.get(id=guide_id)
            
            # Check if connection already exists
            existing = TourGuideConnection.objects.filter(
                tour=tour,
                guide=guide
            ).first()
            
            if existing:
                return existing
            
            return TourGuideConnection.objects.create(
                tour=tour,
                guide=guide
            )
        except (Tour.DoesNotExist, Guide.DoesNotExist):
            raise serializers.ValidationError({
                'detail': 'Invalid tour or guide ID'
            })
        

class BookingAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingAppointment
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'    

class StoryVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryVideo
        fields = ['url']

class StorySerializer(serializers.ModelSerializer):
    videos = StoryVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = ['id', 'title', 'content', 'year_founded', 'videos']        


class CountryDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryDescription
        fields = ['text']

class CountyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountyInfo
        fields = ['county_name', 'info']

class CountrySerializer(serializers.ModelSerializer):
    descriptions = CountryDescriptionSerializer(many=True)
    county_info = CountyInfoSerializer(many=True)
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Country
        fields = ['id', 'name','image', 'descriptions', 'county_info']             
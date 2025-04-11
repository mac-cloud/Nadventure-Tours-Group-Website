from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import GuideSerializer, CountrySerializer, CountyInfoSerializer,NewsletterSerializer, TourSerializer, BlogSerializer,StorySerializer, ServiceSerializer,TourGuideConnectionSerializer, BookingAppointmentSerializer
from .models import Guide, Newsletter, Tour,Country,CountyInfo, TourGuideConnection, BookingAppointment, Blog,Service, Story
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
import logging
from collections import defaultdict

TOWN_COORDINATES = {
    "nairobi": Point(36.8219, -1.2921),
    "mombasa": Point(39.6682, -4.0435),
    "kisumu": Point(34.7617, -0.1022),
    
}



@api_view(['POST'])
def guide_register(request):
    email = request.data.get('email')  
    if Guide.objects.filter(email=email).exists():
        return Response({ 'detail': 'A guide with this email already exists' }, status=status.HTTP_400_BAD_REQUEST)

    data = request.data.copy()

    # Get the location (town name) from the frontend
    town_name = data.get("location", "").lower()  # The town name comes from the frontend

    # Check if the town name exists in the TOWN_COORDINATES dictionary
    if town_name in TOWN_COORDINATES:
        # If the town name exists, map it to the corresponding coordinates (Point object)
        data["location"] = TOWN_COORDINATES[town_name]
    else:
        return Response({"error": "Invalid location name"}, status=400)

    # Proceed with saving the guide data
    serializer = GuideSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({ 'message': 'Guide registered successfully' }, status=status.HTTP_201_CREATED)

    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def subscribe(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        subscriber = serializer.save()

        #email context
        context = {
            'email': subscriber.email,
        }

        #render email content
        html_content = render_to_string('newsletterEmail.html', context)
        text_content = strip_tags(html_content)

        email = EmailMultiAlternatives(
            subject = 'Welcome to Our Monthly Newsletter!',
            body = text_content,
            from_email= 'yawakarua@gmail.com',
            to=[subscriber.email]
        )

        email.attach_alternative(html_content, "text/html")
        email.send()

        return Response({ 'message': 'Subscribed successfully'}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#tour packages
#@api_view(['GET'])
#def get_all_tours(request):
#    tours = Tour.objects.all()
#    serializer = TourSerializer(tours, many=True)
#    return Response(serializer.data)

# Set up logging
logger = logging.getLogger(__name__)

class TourListAPIView(APIView):
    def get(self, request):
        try:
            tours = Tour.objects.all()

              # Log the location to ensure it's correctly associated
            for tour in tours:
                print(f"Tour: {tour.name}, Location ID: {tour.location.id}, Location Name: {tour.location}")


            serializer = TourSerializer(tours, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error fetching tours: {e}")
            return Response(
                {"error": "Failed to retrieve tours"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

@api_view(['GET'])
def get_tour_by_id(request, pk):
    try:
        tour = Tour.objects.get(id=pk)
        serializer = TourSerializer(tour)
        return Response(serializer.data)
    except Tour.DoesNotExist:
        return Response({ 'error': 'Tour not found'}, status=404)


class GuideListAPIView(generics.ListAPIView):
    queryset = Guide.objects.all()
    serializer_class = GuideSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by location if provided in query parameters
        location = self.request.query_params.get('location')
        if location:
            try:
                lon, lat = map(float, location.split(','))
                point = Point(lon, lat)
                
                # Filter guides within 50km radius
                queryset = queryset.annotate(
                    distance=Distance('location', point)
                ).filter(distance__lte=50000)  # 50km in meters
                
                # Order by distance
                queryset = queryset.order_by('distance')
            except ValueError:
                pass  # Invalid location format, return all guides
        return queryset

class TourGuideConnectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        tour_id = request.data.get('tour_id')
        guide_id = request.data.get('guide_id')
        
        try:
            connection = TourGuideConnection.objects.get_or_create(
                tour_id=tour_id,
                guide_id=guide_id
            )[0]
            
            serializer = TourGuideConnectionSerializer(connection)
            return Response(serializer.data)
        except (Tour.DoesNotExist, Guide.DoesNotExist):
            return Response({
                'error': 'Invalid tour or guide ID'
            }, status=400)

class NearbyGuidesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        location = request.query_params.get('location')
        max_distance_km = int(request.query_params.get('max_distance', 50))
        
        if not location:
            return Response({
                'error': 'Location parameter required'
            }, status=400)
            
        try:
            lon, lat = map(float, location.split(','))
            point = Point(lon, lat)
            
            guides = Guide.objects.annotate(
                distance=Distance('location', point)
            ).filter(distance__lte=max_distance_km * 1000)
            
            serializer = GuideSerializer(guides, many=True, context={
                'request': request
            })
            
            return Response(serializer.data)
        except ValueError:
            return Response({
                'error': 'Invalid location format. Use longitude,latitude'
            }, status=400)


class BookingAppointmentView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BookingAppointmentSerializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()

            # Prepare email content
            subject = "🌍 Tour Booking Confirmation"
            from_email = "yawakarua@gmail.com"
            to_email = [booking.email]

            # Load HTML template
            html_content = render_to_string("booking_confirmation.html", {
                "name": booking.name,
                "tour_name": booking.tour_name,
                "booking_id": booking.id,
                "phone": booking.phone,
            })

            text_content = f"Hi {booking.name}, thanks for booking {booking.tour_name}."

            try:
                email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
                email.attach_alternative(html_content, "text/html")
                email.send()
                print(f"✅ Confirmation email sent to {booking.email}")
            except Exception as e:
                print(f"❌ Failed to send email: {e}")

            return Response(
                {"message": "Appointment booked and email sent successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceListView(APIView):
    def get(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    

class BlogListAPIView(APIView):
    def get(self, request):
        blogs = Blog.objects.all()
        data = defaultdict(list)
        for blog in blogs:
            data[blog.category].append(BlogSerializer(blog).data)
        return Response(data)    
    
class StoryListView(APIView):
    def get(self, request):
        stories = Story.objects.prefetch_related('videos').all().order_by('-year_founded')
        serializer = StorySerializer(stories, many=True)
        return Response(serializer.data)


class CountryListAPIView(APIView):
    def get(self, request):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)
    
class CountyListAPIView(APIView):
    def get(self, request, country_name, county_name):
        try:
            country = Country.objects.get(name__iexact=country_name)
            county = country.county_info.get(county_name__iexact=county_name)
            serializer = CountyInfoSerializer(county)
            return Response(serializer.data)
        except (Country.DoesNotExist, CountyInfo.DoesNotExist):
            return Response({"error": "County not found"}, status=404)
from django.urls import path
from .views import guide_register, CountryListAPIView,CountyListAPIView,ServiceListView, StoryListView,BlogListAPIView,BookingAppointmentView, TourListAPIView,subscribe, get_tour_by_id, GuideListAPIView, TourGuideConnectionView,NearbyGuidesView

urlpatterns = [
    path('register/', guide_register, name='guide_register'),
    path('subscribe/', subscribe, name='subscribe'),
    path('tours/', TourListAPIView.as_view(), name='get_all_tours'),
    path('tours/<int:pk>/', get_tour_by_id, name='get_tour_by_id'),
    path('guides/', GuideListAPIView.as_view(), name='guide-list'),
    path('connect-tour-guide/', TourGuideConnectionView.as_view(), name='connect-tour-guide'),
    path('nearby-guides/', NearbyGuidesView.as_view(), name='nearby-guides'),
    path('booking/', BookingAppointmentView.as_view(), name='book-appointment'),
    path('services/', ServiceListView.as_view(), name='services'),
    path('blogs/', BlogListAPIView.as_view(), name='blogs'),
    path('stories/', StoryListView.as_view(), name='story-list'),
    path('countries/', CountryListAPIView.as_view(), name='country-list'),
    path('countries/<str:country_name>/county/<str:county_name>/',CountyListAPIView.as_view(), name='county-list'),


]

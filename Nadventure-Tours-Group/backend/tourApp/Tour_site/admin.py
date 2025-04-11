from django.contrib import admin
from django.core.mail import send_mail
from .models import Guide, Newsletter, Blog, Country,CountryDescription,CountyInfo,TourGuideConnection, BookingAppointment,Service,StoryVideo,Story, Location
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
# Register your models here.

admin.site.register(Newsletter)
admin.site.register(TourGuideConnection)
admin.site.register(BookingAppointment)
admin.site.register(Service)
admin.site.register(Blog)



@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):  
    list_display = ('first_name', 'last_name', 'email', 'status')
    list_filter = ('status',)
    actions = ['approve_guides', 'reject_guides']
    readonly_fields = ('first_name', 'last_name', 'email')

    def approve_guides(self, request, queryset):
        updated = 0
        for guide in queryset:
            if guide.status != 'approved':
               guide.status = 'approved'
            guide.save()
            updated +=1

            #render the HTML email

            context = {
                'guide': guide,
            }
            html_content = render_to_string('emailApproval.html', context)
            text_content = strip_tags(html_content)

            email = EmailMultiAlternatives(
                subject='Guide Application Approved',
                body=text_content,
                from_email='yawakarua@gmail.com',
                to=[guide.email]
            )

            email.attach_alternative(html_content, "text/html")
            email.send()

            self.message_user(request, f"{updated} guide(s) approved and notified")
    approve_guides.short_description = "Approve selected guides and send fancy emails"
       

    def reject_guides(self, request, queryset):
           updated = 0
           for guide in queryset:
               guide.status = 'rejected'
               guide.save()
               updated += 1
       
               # Prepare the context for the email template
               context = {'guide': guide}
       
               # Render the HTML email template
               html_content = render_to_string('emailRejection.html', context)
               # Generate the plain text content by stripping HTML tags
               text_content = strip_tags(html_content)
       
               # Create the email message with both plain text and HTML parts
               email = EmailMultiAlternatives(
                   subject='Guide Application Rejected',
                   body=text_content,
                   from_email='yawakarua@gmail.com',
                   to=[guide.email]
               )
               email.attach_alternative(html_content, "text/html")
               email.send()
       
           self.message_user(request, f"{updated} guide(s) rejected and notified.")
    reject_guides.short_description = "Reject selected guides"




#packages
from django.contrib import admin
from .models import Tour, Location, Hotel, Activity, Review

class LocationInline(admin.TabularInline):
    model = Location
    extra = 1

class HotelInline(admin.TabularInline):
    model = Hotel
    extra = 1

class ActivityInline(admin.TabularInline):
    model = Activity
    extra = 1

class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price_range', 'days')
    inlines = [ HotelInline, ActivityInline, ReviewInline]



admin.site.register(Location)
admin.site.register(Hotel)
admin.site.register(Activity)
admin.site.register(Review)   

class StoryVideoInline(admin.TabularInline): 
    model = StoryVideo
    extra = 1  

class StoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'year_founded')
    search_fields = ('title',)
    inlines = [StoryVideoInline]

admin.site.register(Story, StoryAdmin)
admin.site.register(Country)
admin.site.register(CountryDescription)
admin.site.register(CountyInfo)



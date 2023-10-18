from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .models import GlobalSettings, ContactUS, Navigation, Course
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.utils import timezone  # Import timezone to handle dates
from datetime import datetime


def admin_login(request):
    glob = GlobalSettings.objects.all()
    try:
        # messages.info(request, 'Account not found')
        if request.method == 'POST':
            username = request.POST.get("username")
            password = request.POST.get("password")         
            user_obj = User.objects.filter(username = username)
            
            if not user_obj.exists():
                messages.info(request, "Account not found")
                return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
            print(username, password)
            user_obj = authenticate(username = username, password = password)

            if user_obj and user_obj.is_superuser:
                login(request, user_obj)
                return redirect("dashboard")
          
            messages.info(request, "Invalid password")
            return redirect('')
                    
        return render(request, "login.html", {'glob':glob})
       
    except Exception as e:
        print(e)
        # Add a proper response in case of an exception
        return HttpResponse("An error occurred")


@login_required(login_url=settings.LOGIN_URL)
def dashboard(request):
    glob = GlobalSettings.objects.all()

    return render(request, "dashboard.html", {"glob": glob})


def Logoutpage(request):
    logout(request)
    return redirect("admin_login")


@login_required(login_url=settings.LOGIN_URL)
def globalsetting(request):
    glob = GlobalSettings.objects.all()
    try:
        data = GlobalSettings.objects.first()
    except GlobalSettings.DoesNotExist:
        data = None

    if request.method == "POST":
        name = request.POST.get("name")
        contact = request.POST.get("contact")
        contactdetail = request.POST.get("contactdetail")
        address = request.POST.get("address")
        email = request.POST.get("email")
        description = request.POST.get("description")
        address1 = request.POST.get("address1")
        address2 = request.POST.get("address2")
        facebooklink = request.POST.get("facebooklink")
        youtubelink = request.POST.get("youtubelink")
        link1 = request.POST.get("link1")
        link2 = request.POST.get("link2")
        link3 = request.POST.get("link3")
        link4 = request.POST.get("link4")
        box = request.POST.get("box")
        logo = request.FILES.get("logo")
        back_image = request.FILES.get("back_image")
        brochure = request.FILES.get("brochure")
        brochure_name = request.POST.get("brochure_name")

        if data is None:
            # Create a new GlobalSettings object
            data = GlobalSettings(
                Sitename=name,
                Sitecontact=contact,
                Siteaddress=address,
                Siteemail=email,
                Sitedescription=description,
                Siteaddress1=address1,
                Siteaddress2=address2,
                Sitecontactdetail=contactdetail,
                Sitefacebooklink=facebooklink,
                Sitelink1=link1,
                Sitelink2=link2,
                Sitelink3=link3,
                Sitelink4=link4,
                Siteyoutubelink=youtubelink,
                Sitebox=box,
                brochure_name=brochure_name,
            )
        else:
            # Update existing GlobalSettings object
            data.Sitename = name
            data.Sitecontact = contact
            data.Siteaddress = address
            data.Siteemail = email
            data.Sitedescription = description
            data.Siteaddress1 = address1
            data.Sitecontactdetail = contactdetail
            data.Sitelink1 = link1
            data.Sitelink2 = link2
            data.Sitelink3 = link3
            data.Sitelink4 = link4
            data.Siteaddress2 = address2
            data.Sitefacebooklink = facebooklink
            data.Siteyoutubelink = youtubelink
            data.Sitebox = box
            data.brochure_name = brochure_name

        if logo:
            # Set the uploaded image to the 'logo' field
            data.logo = logo
        if brochure:
            # Set the uploaded image to the 'logo' field
            data.brochure = brochure
        if back_image:
            data.back_image = back_image

        data.save()

        return redirect(
            "globalsetting"
        )  # Redirect to the same view after saving the data

    return render(request, "globalsetting.html", {"data": data, "glob": glob})


@login_required(login_url=settings.LOGIN_URL)
def contactus(request):
    glob = GlobalSettings.objects.all()
    con = ContactUS.objects.all()

    return render(request, "contactus.html", {"con": con, "glob": glob})


@login_required(login_url=settings.LOGIN_URL)
def delete_contact(request, pk):
    con = get_object_or_404(ContactUS, pk=pk)

    if request.method == "POST":
        con.delete()
        return redirect("contactus")

    return redirect("contactus")


@login_required(login_url=settings.LOGIN_URL)
def course(request):
    glob = GlobalSettings.objects.all()
    con = Course.objects.all()

    return render(request, "course.html", {"con": con, "glob": glob})


@login_required(login_url=settings.LOGIN_URL)
def course_view(request, pk_list):
    glob = GlobalSettings.objects.all()
    # Retrieve the specific data records based on the provided IDs
    con = Course.objects.filter(pk=pk_list)

    return render(request, "course_view.html", {"con": con, "glob": glob})


@login_required(login_url=settings.LOGIN_URL)
def delete_course(request, pk):
    con = get_object_or_404(Course, pk=pk)

    if request.method == "POST":
        con.delete()
        return redirect("course")

    return redirect("course")



@login_required(login_url=settings.LOGIN_URL)
def main_navigation(request, parent_id=None):
    glob = GlobalSettings.objects.all()

    if parent_id:
        obj = Navigation.objects.filter(Parent=parent_id).order_by("position")
    else:
        obj = Navigation.objects.filter(Parent=None).order_by("position")

    return render(
        request,
        "main_navigation.html",
        {"obj": obj, "parent_id": parent_id, "glob": glob},
    )


@login_required(login_url=settings.LOGIN_URL)
def navigation_list(request, parent_id=None):
    glob = GlobalSettings.objects.all()
    obj = Navigation.objects.all()

    if request.method == "POST":
        # Retrieve form data
        # next = request.POST.get('next','/')
        name = request.POST.get("name")
        caption = request.POST.get("caption")
        status = request.POST.get("status")
        position = request.POST.get("position")
        page_type = request.POST.get("page_type")
        title = request.POST.get("title")
        short_desc = request.POST.get("short_desc")
        bannerimage = request.FILES.get("bannerimage")
        brochure = request.FILES.get("brochure")
        meta_title = request.POST.get("meta_title")
        meta_keyword = request.POST.get("meta_keyword")
        icon_image = request.POST.get("icon_image")
        slider_image = request.FILES.get("slider_image")
        parent_id = request.POST.get("Parent")
        desc = request.POST.get("desc")
        video_file = request.FILES.get("video_file")
        photodate = request.POST.get("photodate")

        if parent_id:
            parent_navigation = Navigation.objects.get(pk=parent_id)
        else:
            parent_navigation = None

        # Create a new Navigation objectj
        obj = Navigation.objects.create(
            name=name,
            caption=caption,
            status=status,
            position=position,
            page_type=page_type,
            title=title,
            short_desc=short_desc,
            meta_title=meta_title,
            meta_keyword=meta_keyword,
            desc=desc,
            icon_image=icon_image,
            photodate=photodate,
            Parent=parent_navigation,  # Assign parent navigation object
        )
        # obj.Parent = Navigation.objects.filter(id=parent_id)

        # Set uploaded images
        if bannerimage:
            obj.bannerimage = bannerimage
        if slider_image:
            obj.slider_image = slider_image
        if brochure:
            obj.brochure = brochure
        if video_file:
            obj.video_file = video_file
        # if photodate:
        #     obj.photodate = photodate

        obj.save()  # Save the new Navigation object to the database

        obj = Navigation.objects.all()  # Update the navigation list with the new object

        if parent_id:
            return redirect("main_navigation", parent_id=parent_id)
        else:
            return redirect("main_navigation")

    return render(
        request, "navigation.html", {"obj": obj, "glob": glob, "parent_id": parent_id}
    )


@login_required(login_url=settings.LOGIN_URL)
def update(request, pk):
    glob = GlobalSettings.objects.all()
    data = get_object_or_404(Navigation, pk=pk)

    if request.method == "POST":
        name = request.POST.get("name")
        caption = request.POST.get("caption")
        status = request.POST.get("status")
        position = request.POST.get("position")
        page_type = request.POST.get("page_type")
        title = request.POST.get("title")
        short_desc = request.POST.get("short_desc")
        desc = request.POST.get("desc")
        bannerimage = request.FILES.get("bannerimage")
        meta_title = request.POST.get("meta_title")
        meta_keyword = request.POST.get("meta_keyword")
        icon_image = request.POST.get("icon_image")
        slider_image = request.FILES.get("slider_image")
        brochure = request.FILES.get("brochure")
        parent_id = request.POST.get("Parent")
        video_file = request.FILES.get("video_file")
        photodate = request.POST.get("photodate")

        if parent_id:
            parent_navigation = Navigation.objects.get(pk=parent_id)
        else:
            parent_navigation = None

        # Update the object with the form data
        data.name = name
        data.caption = caption
        data.status = status
        data.position = position
        data.page_type = page_type
        data.title = title
        data.short_desc = short_desc
        data.meta_title = meta_title
        data.meta_keyword = meta_keyword
        data.desc = desc
        data.photodate = photodate
        data.Parent = parent_navigation
        data.icon_image = icon_image

        if bannerimage:
            data.bannerimage = bannerimage

        if slider_image:
            data.slider_image = slider_image

        if brochure:
            data.brochure = brochure

        if video_file:
            data.video_file = video_file

        data.save()

        if parent_id:
            return redirect("main_navigation", parent_id=parent_id)
        else:
            return redirect("main_navigation")

    parent_id = data.Parent.id if data.Parent else None

    # Pass the existing photodate value to the template
    existing_photodate = data.photodate.strftime('%Y-%m-%d') if data.photodate else ''
    
    return render(
        request, "update.html", {"data": data, "glob": glob, "parent_id": parent_id, "existing_photodate": existing_photodate}
    )


@login_required(login_url=settings.LOGIN_URL)
def delete_nav(request, pk):
    obj = get_object_or_404(Navigation, pk=pk)
    parent_id = None

    if request.method == "POST":
        parent_id = obj.Parent.id if obj.Parent else None
        obj.delete()

    if parent_id:
        return redirect("main_navigation", parent_id=parent_id)
    else:
        return redirect("main_navigation")

    # return render(request, 'delete.html', {'obj': obj})


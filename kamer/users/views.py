from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect

from .forms import RegistrationForm

'''
    registration view, which contains the fields required to be able to register an account
     ~ see  forms.py
'''


def registration_view(request):
    context = {}
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        # check if all fields are valid
        if form.is_valid():
            form.save()
            # read all passed data
            email = form.cleaned_data.get('email')
            username = form.cleaned_data.get('username')
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            raw_password = form.cleaned_data.get('password1')
            # authenticate the user
            account = authenticate(email=email, password=raw_password)
            # log the user in
            login(request, account)
            # take them to 'home' TODO: change this page to a success page
            redirect('home')
        else:
            # fields were not valid, so show the same form BUT with errors (automatically done via django)
            context['registration_form'] = form
    elif request.method == 'GET':
        # GET so show initialize the form
        form = RegistrationForm()
        context['registration_form'] = form
    # show the user the register.html with the `context` pass through the html
    return render(request, 'users/register.html', context)

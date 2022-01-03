from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect

from .forms import RegistrationForm
from .forms import AccountAuthenticationForm

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
            return redirect('home')
        else:
            # fields were not valid, so show the same form BUT with errors (automatically done via django)
            context['registration_form'] = form
    elif request.method == 'GET':
        # GET so show initialize the form
        form = RegistrationForm()
        context['registration_form'] = form
    # show the user the register.html with the `context` pass through the html
    return render(request, 'users/register.html', context)


'''
    logging out view
'''


def logout_view(request):
    logout(request)
    # TODO : add a 'success logged out page'
    return redirect('home')


'''
    Login view
    ~ see   forms.py -> AccountAuthenticationForm
    follows the same logic as the above function
'''


def login_view(request):
    context = {}
    user = request.user

    # user is authenticated already
    if user.is_authenticated:
        return redirect('home')
    # the method was a post so the user is trying to send the data
    if request.method == 'POST':
        # pass the data to the class
        form = AccountAuthenticationForm(request.POST)
        # check for fields validation

        if form.is_valid():
            # get the data from the request
            email = request.POST['email']
            password = request.POST['password']
            # try to authenticate the user with the input dat
            user = authenticate(email=email, password=password)

            # if the user is TRUE so was successfully authenticated -> log them in
            if user:
                login(request, user)
                # TODO: change to success login page
                return redirect('home')

    # GET request so show them an empty form
    else:
        form = AccountAuthenticationForm()

    context['login_form'] = form
    return render(request, 'users/login.html', context)

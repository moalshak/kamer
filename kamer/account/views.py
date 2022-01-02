from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from requests import Response
from rest_framework import status

from kamer.account.forms import RegistrationForm


def registration_view(request):
    context = {}
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            username = form.cleaned_data.get('username')
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            raw_password = form.cleaned_data.get('password1')
            account = authenticate(email=email, password=raw_password)
            login(request, account)
            return redirect('home')
        else:
            context['registration_form'] = form
    elif request.method == 'GET':
        form = RegistrationForm()
        context['registration_form'] = form
    else:
        return render(request, status=status.HTTP_400_BAD_REQUEST)

    return render(request, 'account/register.html', context)


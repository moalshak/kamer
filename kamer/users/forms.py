from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import Account

'''
    RegistrationForm that is going to be used to register and account and add it to the database
'''


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=60, help_text='Required, insert your email')

    # adding the fields
    class Meta(UserCreationForm.Meta):
        model = Account
        fields = ('email', 'username', 'first_name', 'last_name', 'password1', 'password2')

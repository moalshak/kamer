from django import forms
from django.contrib.auth.forms import UserCreationForm

from kamer.account.models import Account


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=60, help_text='Required, insert your email')

    class Meta:
        model = Account
        fields = ('email', 'username', 'first_name', 'last_name', 'password1', 'password2')

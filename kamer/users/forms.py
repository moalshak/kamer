from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate
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


'''
    Login form that extends the forms.Modelform
'''


class AccountAuthenticationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = Account
        fields = ('email', 'password')

    # before the form can do anything it has to run this clean method
    # that is why we try to authenticate the user here
    def clean(self):
        if self.is_valid():
            email = self.cleaned_data['email']
            password = self.cleaned_data['password']
            if not authenticate(email=email, password=password):
                raise forms.ValidationError('Invalid email or password')

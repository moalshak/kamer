from django.conf import settings
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

'''
    creating a new user
     NOTE ~ the passed parameters are the required one
'''


class MyAccountManager(BaseUserManager):
    # Creates a regular ass user
    def create_user(self, email, username, first_name, last_name, password=None):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        if not first_name:
            raise ValueError("First name is required")
        if not last_name:
            raise ValueError("Last name is required")
        # create the user
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name
        )

        # set the password give by the user ~ this is a built-in function
        user.set_password(password)

        # save the user in the database
        user.save(using=self._db)
        # return the made & saved user
        return user
    '''
        creates a superuser
    '''
    def create_superuser(self, email, username, first_name, last_name, password=None):
        user = self.create_user(email, username, first_name, last_name, password=password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    '''
        creates a 'staff' user, user with role staff.
            ~ right now this is the same as the superuser, but we can add more functionality later on
    '''
    def create_staff_user(self, email, username, first_name, last_name, password=None):
        user = self.create_user(email, username, first_name, last_name, password=password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


'''
    Account model for the accounts that will be created for the users
'''


class Account(AbstractBaseUser):
    email = models.EmailField(max_length=60, unique=True)
    # !! the following fields are required !!
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='Date Joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='Last Login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    # these are optional fields
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_owner = models.BooleanField(default=True)
    is_renter = models.BooleanField(default=True)

    # reference to the accounts manager which is needed for this "Custom User Class" to work
    objects = MyAccountManager()

    # field that users will use to log in
    USERNAME_FIELD = 'email'
    # the fields that are required
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    ####################################################################################
    # DO NOT CHANGE ANYTHING BELOW HERE THIS IS ALL REQUIRED FOR OUR CUSTOM USERS CLASS#
    ####################################################################################

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, account):
        return True

    def is_active(self):
        return self.is_active

    @property
    def is_staff(self):
        # Simplest possible answer: All admins are staff
        return self.is_admin

'''
    creates an authentication token for each new registered user or a logged in user
'''


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


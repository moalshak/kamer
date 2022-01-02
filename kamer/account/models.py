from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import email_normalize

'''
    creating a new user
     NOTE ~ the passed parameters are the required one
'''


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, password=None):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        if not first_name:
            raise ValueError("First name is required")
        if not last_name:
            raise ValueError("Last name is required")
        # email = BaseUserManager.normalize_email(email)
        # create the user
        user = self.model(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name
        )

        # set the password give by the user ~ this is a built in function
        user.set_password = password

        # save the user in the database
        user.save(using=self._db)

        # return the made & saved user
        return user

    def create_superuser(self, email, username, first_name, last_name, password):
        user = self.create_user(self, email, username, first_name, last_name)
        user.is_renter = False
        user.is_owner = False
        user.is_staff = True
        user.is_admin = True

        user.save(using=self._db)

    def create_staff_user(self, email, username, first_name, last_name, password):
        user = self.create_user(self, email, username, first_name, last_name)
        user.is_renter = False
        user.is_owner = False
        user.is_staff = True

        user.save(using=self._db)

        return user


'''
    Account model for the accounts that will be created for the users
'''


class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_joined = models.DateTimeField(verbose_name='Date Joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='Last Login', auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=True)
    is_renter = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # reference to the account manager which is needed
    object = MyAccountManager()

    # field that users will use to log in
    USERNAME_FIELD = 'email'
    # the fields that are required
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_model_perm(self, app_label):
        return True

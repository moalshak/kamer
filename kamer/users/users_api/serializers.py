from rest_framework import serializers
from ..models import Account


# serializer for registration
class RegistrationSerializer(serializers.ModelSerializer):
    # the model Account does not have a password2, so we need to add that manually
    # style -> hide..
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']
        # hiding the password field for security
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # overriding the save method to match our Account model
    def save(self):
        account = Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        # check to see if the passwords match. If not raise an error through json
        if password != password2:
            raise serializers.ValidationError({'password': 'passwords must match!'})
        account.set_password(password)
        # save the account through the not original save method
        account.save()
        return account

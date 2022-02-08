#!/bin/bash

# in the pdf it was mentioned that the script will be ran as root
#  this makes the 's redundant, but just in case
#

echo "Please make sure your system is up to date"
apt update -y  && apt upgrade -y

# Install node version 16

echo "installing curl"
apt install curl -y
# install node version 16 && npm
echo "installing node version 16 & npm"
curl -sL https://deb.nodesource.com/setup_16.x | bash -

apt autoremove
apt update -y  && apt upgrade -y

apt install nodejs -y
echo "installing npm"
apt install npm -y

# install python and pip
echo "installing python"
apt install python3 python3-pip -y
# sometimes pip does not get the latest version
echo "upgrading pip"
python3 -m pip install --upgrade pip

echo "installing the virtualenv"
# install virtualenv and create the env
apt install python3-virtualenv -y
echo "Making a virtual enviourment and activating it"
virtualenv env && source env/bin/activate

# install the requierments
echo "Installing the requierments"
pip3 install -r requierments.txt

# go into the react then install the node packages
echo "Installing node packages"
cd kamer/react-frontend && npm install

# go back
cd ..

echo "Installing node screen"
apt install screen -y

# install nettools for ifconfig
apt install net-tools -y

# done
echo "Everything installed successfully"
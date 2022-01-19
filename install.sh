#!/bin/bash

# in the pdf it was mentioned that the script will be ran as root
#  this makes the sudo's redundant, but just in case
#

echo "Please make sure your system is up to date"
# sudo apt-get update -y  && sudo apt-get upgrade -y 

# Install node version 16

echo "installing curl"
sudo apt-get install curl -y
# install node version 16 && npm
echo "installing node version 16 & npm"
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install nodejs -y
echo "installing npm"
sudo apt-get install npm -y

# install python and pip
echo "installing python"
sudo apt-get install python3 python3-pip -y
# sometimes pip does not get the latest version
echo "upgrading pip"
python3 -m pip install --upgrade pip -y

echo "installing the virtualenv"
# install virtualenv and create the env
sudo apt-get install python3-virtualenv -y
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
sudo apt-get install screen -y

# done
echo "Everything installed successfully"
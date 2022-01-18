#!/bin/bash

# update and upgrade the system
sudo apt-get update -y && sudo apt-get upgrade -y

# Install node version 16

#install curl
sudo apt-get install curl
# install node version 16 && npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install nodejs npm -y 

# install python and pip
sudo apt-get install python3 python3-pip -y
# sometimes pip does not get the latest version
python3 -m pip install --upgrade pip -y

# install virtualenv and create the env
sudo apt-get install python3-virtualenv -y
virtualenv env && source env/bin/activate

# install the requierments
pip3 install -r requierments.txt

# go into the react then install the node packages
cd kamer/react-frontend && npm install

# go back
cd ..


# done
echo "Everything installed successfully"
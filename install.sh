#!/bin/bash


sudo apt-get update -y && sudo apt-get upgrade -y

sudo apt-get install python3 python3-pip nodejs -y


# install virtualenv and create the env
pip3 install virtualenv
virtualenv env && source env/bin/activate

# install the requierments
pip3 install -r requierments.txt

# go into the react then install the node packages
cd kamer/react-frontend && npm install

# go back
cd ..
#!/bin/bash

# run env
source env/bin/activate

# cd into the folder
cd kamer/react-frontend


# this fixed a no module found
# rm -rf node_modules
npm install

# build the website
npm run build

# go back a dir
cd ..

# collect static files built by react
python3 manage.py collectstatic --noinput

# echo "Do you want to start the server at 0.0.0.0:8000 (y/N) ? "
# echo "Choose 0.0.0.0:8000 if you want to connect via other devices on your network."

################################################################################################################
# the TA should not be requiered to input (PDF says so) anything so this is not needed but could be very useful#
################################################################################################################

# read answer
# if [$answer = "y" || $answer = "Y" ] 
# then
#     python3 manage.py runserver 0.0.0.0:8000 &
#     # message
#     echo "The server has started at http://127.0.0.1:8000/" 
# else
#     python3 manage.py runserver &
#     # message
#     echo "The server has started at http://127.0.0.1:8000/" 
# fi

screen -d -m python3 manage.py runserver

# message
echo "############################################"
echo "The server has started at http://127.0.0.1:8000/ and is running."
echo "You can also visit our website at : https://www.team13.xyz/ which hosts both our back and frontend"

echo "############################################"
echo "In order to go back to the terminal where the server is running do :: screen -r"
echo "To visit the website on your host machine see the following output"
# show the ip of the container
ifconfig | grep inet
echo "############################################"

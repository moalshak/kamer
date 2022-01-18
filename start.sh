#!/bin/bash


# run env
source env/bin/activate

# cd into the folder
cd kamer/react-frontend


# this fixed a no module found
rm -rf node_modules
npm install

# build the website
npm run build

# go back a dir
cd ..

# start the server (REACT)
python3 manage.py collectstatic --noinput
python3 manage.py runserver
import json
import sqlite3
from sqlite3.dbapi2 import Error

try:
    db = sqlite3.connect('/home/salo/uni/2021-Group13/specifications/db.sqlite3')
except Error as e:
    print(e.message)

traffic = json.load(open('output.json'))
for c in traffic:
    columns = list(c.keys())

# columns = ['externalId', 'areaSqm', 'city', 'coverImageUrl', 'furnish', 'latitude', 'longitude', 'postalCode', 'propertyType', 'rent', 'title', 'deposit', 'descriptionTranslated', 'gender', 'isRoomActive', 'pageDescription', 'pageTitle', 'pets', 'roommates']

query = "insert into api_property ({0}) values (?{1})"
query = query.format(",".join(columns), ",?" * (len(columns)-1))

i = 0
for data in traffic:
    keys = tuple()
    for c in columns:
        try:
            keys = keys + (data[c],)
        except KeyError:
            keys = keys + (None,)
    c = db.cursor()
    c.execute(query, keys)
    db.commit()
    i += 1


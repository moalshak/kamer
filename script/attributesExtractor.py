import json
import os
from pathlib import Path

pathOfProp = str(input("Enter folder that contains properties.json file (leave empty if same directory): "))
pathOfProp += "properties.json"

f = open(pathOfProp, 'r')

data = [json.loads(line) for line in f]

nAtt = int(input("How many attributes do you need to extract? "))

needed = []

for i in range(nAtt):
    needed.append(str(input("Enter the exact the attribute:  ")))

lines = []

for i in data:
    line = {}
    for att in needed:
        line[att] = (i[att])
    lines.append(line)

write_path = str(input("Enter where you want to save the output file (leave empty if same dir):  "))
write_path += 'output.json'

if not os.path.exists(write_path):
    Path(write_path).touch(exist_ok=True)

outputData = json.dumps(lines, indent=4)


with open(write_path, "w") as stream:
    stream.write(outputData)

print("DONE")

f.close()

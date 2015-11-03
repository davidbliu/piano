import os
# variables up top
DATAFILE = 'data.js'
SOUND_FOLDER = './kpop-samples/'
mappings = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191]
KEYS = []
for m in mappings:
    # KEYS.append(m.split('-->')[1])
    KEYS.append(str(m))

print KEYS
# construct keyMap
files = [x for x in os.listdir(SOUND_FOLDER) if '.wav' in x and '.asd' not in x]
# files.reverse()
print len(files)

index = 0
keyMap = {}
soundstring = ''
for f in files:
    if index < len(KEYS):
        key = KEYS[index]
        keyMap[key] = SOUND_FOLDER+f
        index += 1
        print str(key)+":"+f

# write to data dir

with open(DATAFILE, 'w') as datafile:
    datafile.write('keyMap = {};\n')
    for key in keyMap.keys():
        datafile.write('keyMap["'+key+'"] = "'+keyMap[key]+'";\n')

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from functools import reduce
from PIL import Image, ExifTags
import json
from firebase import firebase
from io import BytesIO
import base64
from os import listdir
from os.path import isfile, join

app = Flask(__name__, template_folder='templates')

###############################################################################################################
#helper for is_imgs_similar
def phash(img):
    img = img.resize((8, 8), Image.ANTIALIAS).convert('L')
    avg = reduce(lambda x, y: x + y, img.getdata()) / 64.
    hash_value=reduce(lambda x, y: x | (y[1] << y[0]), enumerate(map(lambda i: 0 if i < avg else 1, img.getdata())), 0)
    print(hash_value)
    return hash_value
#helper for is_imgs_similar
def hamming_distance(a, b):
    hm_distance=bin(a ^ b).count('1')
    print(hm_distance)
    return hm_distance

def is_imgs_similar(img1,img2):
    return True if hamming_distance(phash(img1),phash(img2)) <= 5 else False


def groupImages(imgArray):
    likeImages={}
    for i in range(0,len(imgArray)):
        if i==len(imgArray):break
        for j in range(i+1,len(imgArray)):
            is_imgs_similar(target_pic, sensitive_pic)

#########################################################################################

#Helpers

def get_exif(path):
  i = Image.open(path)
  exif = { ExifTags.TAGS[k]: v for k, v in i._getexif().items() if k in ExifTags.TAGS }
  return json.dumps(exif.decode('utf-8'))


def postInteraction(someJson):
    firebase = firebase.FirebaseApplication('https://builtworlds2019.firebaseio.com/', None)
    result = firebase.post('/unsorted',someJson)
    print(result)

def getUnsortedData():
    firebase = firebase.FirebaseApplication('https://builtworlds2019.firebaseio.com/', None)
    result = firebase.get('/unsorted', None)
    print(result)
    return result

################################################################################################
#Serve uploading website
@app.route("/")
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def serve():
    return render_template('index.html')

#
@app.route('/saveData', methods = ['POST'])
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def saveData():
    app.logger.error("accessed")
    print (request.is_json)
    content = request.data
    print (content)
    #should get request but doesnt work

    interaction = {}
    count = 0
    for img in [f for f in listdir("images") if isfile(join("images", f))]: #for filename in images
        print(img)
        imgStruct = {}

        with open("images/"+img, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            imgStruct["face"] = str(encoded_string);

        imgStruct["guts"] = str(get_exif("images/"+img))
        interaction["img"+str(count)] = imgStruct
        count+=1

    postInteraction(interaction);
    return "none"

if __name__ == "__main__":
    app.run(host='0.0.0.0')
##############################################################
    #
    # result=is_imgs_similar(target_pic, sensitive_pic)

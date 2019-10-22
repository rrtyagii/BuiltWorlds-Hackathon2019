
from functools import reduce
from PIL import Image


def phash(img):

    img = img.resize((8, 8), Image.ANTIALIAS).convert('L')
    avg = reduce(lambda x, y: x + y, img.getdata()) / 64.
    hash_value=reduce(lambda x, y: x | (y[1] << y[0]), enumerate(map(lambda i: 0 if i < avg else 1, img.getdata())), 0)
    print(hash_value)
    return hash_value

def hamming_distance(a, b):
    hm_distance=bin(a ^ b).count('1')
    print(hm_distance)
    return hm_distance

def is_imgs_similar(img1,img2):
    return True if hamming_distance(phash(img1),phash(img2)) <= 5 else False

if __name__ == '__main__':
    exp1 = Image.open("example1.jpg")
    exp2 = Image.open("example1.jpg")
    exp3 = Image.open("example1.jpg")
    exp3 = Image.open("example1.jpg")


    result=is_imgs_similar(target_pic, sensitive_pic)

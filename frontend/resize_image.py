from PIL import Image                                              
import os, sys                       

path = "./src/images/lane/"
dirs = os.listdir( path )                                       

def resize():
    for item in dirs:
        print(item)
        if os.path.isfile(path+item):
            im = Image.open(path+item)
            f, e = os.path.splitext(path+item)
            imResize = im.resize((240,240), Image.ANTIALIAS)
            imResize.save(f+'.png', 'png', quality=100)

resize()
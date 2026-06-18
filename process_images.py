import sys
from PIL import Image

def make_black_transparent(img_path):
    print(f"Processing {img_path}")
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # If pixel is exactly black or very dark
        if item[0] < 10 and item[1] < 10 and item[2] < 10:
            newData.append((0, 0, 0, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(img_path, "PNG")

for f in ["public/screens/hero-portrait.png", "public/screens/feature-1-portrait.png", "public/screens/feature-2-portrait.png"]:
    make_black_transparent(f)


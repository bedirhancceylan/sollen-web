import sys
from PIL import Image, ImageDraw

def process(input_path, output_path):
    print(f"Processing {input_path}")
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # We want to replace black background with transparent.
    # To be safe against anti-aliasing near the bezel, we'll use a small threshold.
    # However, ImageDraw.floodfill supports exact match or small threshold.
    ImageDraw.floodfill(img, (width//2, 100), (0, 0, 0, 0), thresh=10)
    ImageDraw.floodfill(img, (width//2, height-100), (0, 0, 0, 0), thresh=10)
    ImageDraw.floodfill(img, (100, height//2), (0, 0, 0, 0), thresh=10)
    ImageDraw.floodfill(img, (width-100, height//2), (0, 0, 0, 0), thresh=10)
    
    # Also crop the transparent borders to make it fit exactly
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        print(f"Cropped to {bbox}")
        
    img.save(output_path, "PNG")

process("/Users/bedirhanceylan/Downloads/hero-portrait.png", "public/screens/hero-portrait.png")
process("/Users/bedirhanceylan/Downloads/feature-1-portrait.png", "public/screens/feature-1-portrait.png")
process("/Users/bedirhanceylan/Downloads/feature-2-portrait.png", "public/screens/feature-2-portrait.png")

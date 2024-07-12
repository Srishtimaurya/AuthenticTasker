from pptx import Presentation
from PIL import Image
import io

def convert_pptx_slide_to_image(input_pptx, slide_number, output_image):
    # Load the PowerPoint presentation
    presentation = Presentation(input_pptx)

    # Select the desired slide
    slide = presentation.slides[slide_number - 1]

    # Create an empty image with the same dimensions as the slide
    image = Image.new("RGB", (int(presentation.slide_width), int(presentation.slide_height)), "white")

    # Iterate through the shapes on the slide and paste them onto the image
    for shape in slide.shapes:
        if hasattr(shape, 'image'):
            image_data = shape.image.blob
            with io.BytesIO(image_data) as stream:
                img = Image.open(stream)
                image.paste(img, (int(shape.left), int(shape.top)))

    # Save the image locally
    image.save(output_image)

# Example usage
input_pptx_file = "input.pptx"
slide_number_to_convert = 1  # Change this to the desired slide number
output_image_file = "output.png"

convert_pptx_slide_to_image(input_pptx_file, slide_number_to_convert, output_image_file)

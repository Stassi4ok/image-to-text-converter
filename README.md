# Image To Text Converter

Image To Text Converter is a modern Angular web application that extracts text from images using OCR technology. Users can upload JPEG or PNG images, preview them before processing, and receive recognized text in a clean, readable format.

## Features

- Upload JPEG and PNG images
- Maximum file size: 2 MB
- Image preview before processing
- OCR text extraction using external API
- Automatic reconstruction of text from OCR coordinates
- Copy extracted text to clipboard
- Loading and error handling states

## How It Works

The OCR API returns detected words with their coordinates:
JSON


{
  "text": "Hello",
  "x1": 10,
  "y1": 20,
  "x2": 60,
  "y2": 40
}

The application:

1. Sorts words by vertical position.
2. Groups words into text lines.
3. Sorts words inside each line by horizontal position.
4. Combines them into a readable text block.

Example output:
copy

Hello World
Angular OCR
Image To Text

## Tech Stack

- Angular
- TypeScript
- RxJS
- Angular HttpClient
- OCR API
- CSS / SCSS

import { captureCamera } from 'tesseract-with-html5-camera';
import { showSpinner, hideSpinner } from './spinner.js';
import { getLocation } from './positionandsave.js';

export const fileInput = document.getElementById('licensePlateInput');
export const imageElement = document.getElementById('licensePlateImage');

// function to scan image for license plate text
export async function scanImage() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('Camera not supported');
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const image = await captureCamera(stream);
    showSpinner(); // display loading spinner
    // use Tesseract OCR to convert image to text
    Tesseract.recognize(image, {
      lang: 'deu', // set language to German
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789', // only allow these characters
      tessedit_pageseg_mode: 10, // adjust OCR window size
      lstm_choice_mode: 1, // use lstm training model
    }).then(result => {
      console.log(result.text); // log recognized text
      hideSpinner(); // hide loading spinner
      const licensePlate = result.text;
      getLocation(licensePlate); // call getLocation() function with license plate
      // process recognized text further, e.g. save it in a database or apply further text processing
    }).catch(error => {
      console.error(error);
      hideSpinner(); // hide loading spinner
    }).finally(() => {
      stream.getVideoTracks()[0].stop();
    });
  } catch (error) {
    console.error(error);
  }
}

export function processImage(input) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // do something with the image, e.g. display it
      const imageElement = document.getElementById('licensePlateImage');
      imageElement.src = this.src;
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
}

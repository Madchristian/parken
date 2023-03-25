// licensePlateScanner.js
import { getLocation } from './positionandsave.js';
import { showSpinner, hideSpinner } from './spinner.js';

export const licensePlateFileInput = document.getElementById('licensePlateInput');

export async function scanImage(inputElement) {
  console.log('scanImage function called');
  const fileInput = document.getElementById('licensePlateInput');
  if (fileInput.files.length === 0) {
    console.error('No image selected');
    return;
  }
  const imageFile = fileInput.files[0];
  showSpinner(); // display loading spinner
  // use Tesseract OCR to convert image to text
  await worker.load();
  await worker.loadLanguage('deu');
  await worker.initialize('deu');
  const { data: { text } } = await worker.recognize(imageFile, {
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789-'
  });
  console.log(text); // log recognized text
  await worker.terminate();
  hideSpinner(); // hide loading spinner
  const licensePlate = text;
  getLocation(licensePlate); // call getLocation() function with license plate
  // process recognized text further, e.g. save it in a database or apply further text processing
}

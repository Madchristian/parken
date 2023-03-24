import jsQR from 'jsqr';

// select HTML elements
const imageElement = document.getElementById('image');
const qrCodeImageElement = document.getElementById('qrCodeImage');
const fileInput = document.getElementById('licensePlateInput');

// add event listener to file input to scan selected image
fileInput.addEventListener('change', event => {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      imageElement.src = reader.result;
    };
    scanImage(file).catch(error => {
      console.error(error);
    });
  }
});

// function to scan image for license plate text
async function scanImage(imageFile) {
  showSpinner(); // display loading spinner
  // use Tesseract OCR to convert image to text
  Tesseract.recognize(imageFile, {
    lang: 'deu', // set language to German
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789', // only allow these characters
    tessedit_pageseg_mode: 10, // adjust OCR window size
    lstm_choice_mode: 1, // use lstm training model
  }).then(result => {
    console.log(result.text); // log recognized text
    hideSpinner(); // hide loading spinner
    // process recognized text further, e.g. save it in a database or apply further text processing
  }).catch(error => {
    console.error(error);
    hideSpinner(); // hide loading spinner
  });
}

// function to scan QR code from canvas
async function scanQRCode(canvas) {
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  if (code) {
    return code.data;
  } else {
    return null;
  }
}



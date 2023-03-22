const video = document.createElement('video');
video.autoplay = true;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Set the dimensions of the canvas to match the video feed
const constraints = {
  video: { width: 640, height: 480 },
};
navigator.mediaDevices.getUserMedia(constraints).then(stream => {
  video.srcObject = stream;
});

function capture() {
  // Draw the current frame of the video onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get the image data from the canvas
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  // Perform OCR on the image data
  Tesseract.recognize(imageData, {
    lang: 'deu',
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    tessedit_create_hocr: false,
  })
    .then(result => {
      console.log(result.text);
    })
    .catch(error => {
      console.log(error);
    });
}

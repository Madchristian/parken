import { showSpinner, hideSpinner } from './spinner.js';
import { getLocation } from './positionandsave.js';





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

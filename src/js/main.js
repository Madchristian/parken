// main.js
import { getLocation } from './positionandsave.js';
import { showSpinner, hideSpinner } from './spinner.js';
import { scanQRCodeHandler} from './scanqrcodehandler.js';
import { processImage } from './scanlicenseplate.js';
export const fileInput = document.getElementById('licensePlateInput');
export {
  getLocation,
  showSpinner,
  hideSpinner,
  scanQRCodeHandler
};
function init() {
    document.getElementById('positionButton').addEventListener('click', async () => {
      try {
        await getLocation('');
      } catch (error) {
        console.error(error);
      }
    });
  
    document.getElementById('scanLicensePlateButton').addEventListener('click', () => {
      fileInput.addEventListener('change', async () => {
        try {
          await scanImage();
        } catch (error) {
          console.error(error);
        }
      });
      fileInput.click();
    });
  
    document.getElementById('scanQRCodeButton').addEventListener('click', async () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        try {
          await scanQRCodeHandler();
        } catch (error) {
          console.error(error);
        }
      } else {
        alert('This feature is only available on mobile devices.');
      }
      
    })
      
  }
  
  window.onload = init;
  
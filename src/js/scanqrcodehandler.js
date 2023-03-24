// scanqecodehandler.js

import { scanQRCodeAndroid } from './scanqrcodeandroid';
import { scanQRCodeiOS } from './scanqrcodeios.js';

async function scanQRCodeHandler() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    await scanQRCodeiOS();
  } else {
    const qrCodeData = await scanQRCodeAndroid();
    processQRCode(qrCodeData);
  }
}

function saveData(licensePlate) {
  // ...
}

document.getElementById('scanQRCodeButton').addEventListener('click', async () => {
  try {
    await scanQRCodeHandler();
  } catch (error) {
    console.error(error);
  }
});

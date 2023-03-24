// Main.js

import { getLocation } from './position.js';
import { scanLicensePlate } from './licensePlate.js';
import { scanQRCodeHandler } from './scanqrcodehandler.js';
import { showSpinner, hideSpinner } from './spinner.js';
import { openCamera } from './position.js';
import { toggleNav } from './navbar.js';

document.getElementById('getLocationButton').addEventListener('click', async () => {
try {
await getLocation();
} catch (error) {
console.error(error);
}
});

document.getElementById('scanLicensePlateButton').addEventListener('click', async () => {
try {
await scanLicensePlate();
} catch (error) {
console.error(error);
}
});

document.getElementById('scanQRCodeButton').addEventListener('click', async () => {
try {
await scanQRCodeHandler();
} catch (error) {
console.error(error);
}
});

document.getElementById('openCameraButton').addEventListener('click', async () => {
try {
await openCamera();
} catch (error) {
console.error(error);
}
});

document.getElementById('toggleNavButton').addEventListener('click', () => {
toggleNav();
});

function init() {
console.log('Init');
}

window.onload = init;
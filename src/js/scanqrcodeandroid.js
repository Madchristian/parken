import { getLocation } from './positionandsave.js';

export async function scanQRCodeAndroid() {
  const constraints = {
    audio: false,
    video: { facingMode: { exact: "environment" } }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.createElement('video');
    video.srcObject = stream;
    document.body.appendChild(video);

    const codeReader = new ZXing.BrowserQRCodeReader();
    const result = await codeReader.decodeFromVideoElement(video);

    video.srcObject.getTracks().forEach(track => track.stop());
    document.body.removeChild(video);

    const licensePlate = extractLicensePlate(result.text); // extrahieren des Kennzeichens aus dem QR-Code-Text
    getLocation(licensePlate); // getLocation() mit dem Kennzeichen aufrufen
    
    return result.text;
  } catch (error) {
    console.error(error);
  }
}


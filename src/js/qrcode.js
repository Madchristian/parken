// Installieren Sie zuerst die "qrcode" Bibliothek über npm:
// npm install qrcode

// Importieren Sie die "qrcode" Bibliothek
import QRCode from 'qrcode';

// Definieren Sie die Funktion zum Scannen des QR-Codes
function scanQRCode() {
  // Zeigen Sie die Kamera an und erkennen Sie den QR-Code
  const codeReader = new ZXing.BrowserQRCodeReader();
  codeReader
    .decodeFromInputVideoDevice(undefined, 'video')
    .then(result => {
      console.log(result.text);
      saveData(result.text);
    })
    .catch(error => {
      console.error(error);
    });
}

// Generieren Sie einen QR-Code mit dem Kennzeichen-Text
QRCode.toCanvas(document.getElementById('canvas'), licensePlate, function(error) {
  if (error) console.error(error);
  else console.log('QR-Code generated successfully');
});

// Rufen Sie die "scanQRCode()" Funktion auf, wenn der "QR"-Button geklickt wird
const qrButton = document.getElementById('qrButton');
qrButton.addEventListener('click', event => {
  scanQRCode();
});

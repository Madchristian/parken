// Wählen Sie das HTML-Element aus, das das Bild enthält
const imageElement = document.getElementById('image');

// Wählen Sie das HTML-Element aus, das den Dateiauswahldialog auslöst
const fileInput = document.getElementById('licensePlateInput');

// Fügen Sie einen Event-Listener hinzu, um auf Änderungen im Dateiauswahldialog zu reagieren
fileInput.addEventListener('change', event => {
  // Überprüfen Sie, ob eine Datei ausgewählt wurde
  if (event.target.files.length > 0) {
    // Lesen Sie die ausgewählte Datei ein und zeigen Sie sie im Bild-Element an
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      imageElement.src = reader.result;
    };

    // Rufen Sie die "scanImage()" Funktion auf, um das Bild zu scannen
    scanImage(file).catch(error => {
      console.error(error);
    });
  }
});

function processImage(imageFile) {
  // Konvertieren Sie das Bild in ein Textdokument mit Tesseract OCR
  showSpinner(); // Anzeigen des Ladebalkens
  Tesseract.recognize(imageFile, {
    lang: 'deu', // Definieren Sie die Sprache des zu scannenden Texts
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789', // Nur diese Zeichen werden erlaubt
    tessedit_pageseg_mode: 10, // Passen Sie die Größe des OCR-Fensters an
    lstm_choice_mode: 1, // Verwenden Sie das "lstm" Trainingsmodell
  }).then(result => {
    // Geben Sie den erkannten Text aus
    console.log(result.text);
    hideSpinner(); // Ausblenden des Ladebalkens
    // Verarbeiten Sie den erkannten Text weiter, z. B. speichern Sie ihn in einer Datenbank oder wenden Sie eine weitere Textverarbeitung darauf an
  }).catch(error => {
    console.error(error);
    hideSpinner(); // Ausblenden des Ladebalkens
  });
}

function onOpenCvReady() {
  console.log('OpenCV is ready');
}
async function scanQRCode() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const video = document.createElement('video');
  video.autoplay = true;

  const constraints = {
    video: { facingMode: 'environment' }
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.error(error);
    });

  return new Promise((resolve, reject) => {
    const scanQR = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        resolve(code.data);
      } else {
        requestAnimationFrame(scanQR);
      }
    };
    requestAnimationFrame(scanQR);
  });
}

async function getLocation() {
  const licensePlate = document.getElementById('licensePlate').value;
  if (navigator.geolocation) {
    showSpinner(); // Anzeigen des Ladebalkens
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      const qrCodeData = await scanQRCode();
      console.log(`QR Code: ${qrCodeData}`);
      saveData(licensePlate, latitude, longitude, qrCodeData).catch(error => {
        console.error(error);
      }).finally(() => {
        hideSpinner(); // Ausblenden des Ladebalkens unabhängig davon, ob das Speichern erfolgreich war oder nicht
      });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

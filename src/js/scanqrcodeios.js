//scanqrcodeios.js

async function scanQRCodeiOS() {
    const captureDevice = await getCaptureDevice();
    const captureSession = new AVCaptureSession();
    const captureOutput = new AVCaptureMetadataOutput();
  
    const previewLayer = AVCaptureVideoPreviewLayer.layerWithSession(captureSession);
    previewLayer.frame = document.bounds;
    document.body.layer.addSublayer(previewLayer);
  
    const captureInput = AVCaptureDeviceInput.deviceInputWithDeviceError(captureDevice);
    if (captureInput) {
      captureSession.addInput(captureInput);
      captureSession.addOutput(captureOutput);
      captureOutput.setMetadataObjectsDelegateQueue(this, null);
  
      const availableMetadataObjectTypes = captureOutput.availableMetadataObjectTypes();
      if (availableMetadataObjectTypes.containsObject(AVMetadataObjectTypeQRCode)) {
        captureOutput.metadataObjectTypes = [AVMetadataObjectTypeQRCode];
        captureOutput.setMetadataObjectsDelegateQueue(this, null);
  
        captureSession.startRunning();
      } else {
        console.log('QR-Code-Erkennung wird auf diesem Gerät nicht unterstützt.');
      }
    } else {
      console.log('Die Kamera konnte nicht geöffnet werden.');
    }
  
    function captureOutputDidOutputMetadataObjectsFromConnection(metadataObjects, connection) {
      if (metadataObjects.length > 0) {
        const qrCodeObject = metadataObjects[0];
        const qrCodeData = qrCodeObject.stringValue;
        console.log(`QR-Code: ${qrCodeData}`);
        saveData(qrCodeData);
        captureSession.stopRunning();
      }
    }
  }
  
  function getCaptureDevice() {
    return new Promise(resolve => {
      const devices = AVCaptureDevice.devicesWithMediaType(AVMediaTypeVideo);
      for (let i = 0; i < devices.length; i++) {
        const device = devices[i];
        if (device.position === AVCaptureDevicePositionBack) {
          resolve(device);
          return;
        }
      }
      resolve(AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo));
    });
  }
  
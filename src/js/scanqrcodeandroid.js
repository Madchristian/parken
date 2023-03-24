// scanqrcodeandroid.js

async function scanQRCodeAndroid() {
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
      codeReader.decodeFromVideoElement(video, (result, err) => {
        if (result) {
          console.log(result.text);
          saveData(result.text);
          video.srcObject.getTracks().forEach(track => track.stop());
          document.body.removeChild(video);
        }
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  
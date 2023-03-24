async function saveData(licensePlate, latitude, longitude) {
  const apiUrl = "https://parken.cstrube.de/apiv3/save-data";
  const data = {
    licensePlate: licensePlate,
    latitude: latitude,
    longitude: longitude
  };
  showSpinner(); // Anzeigen des Ladebalkens

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Data saved successfully:", jsonResponse);

      hideSpinner(); // Ausblenden des Ladebalkens
      const swoosh = new Audio("/sound/swoosh.mp3");
      swoosh.play();
    } else {
      console.error("Error saving data:", response.status, response.statusText);
      const errorsound = new Audio("/sound/error.mp3");
      errorsound.play();
      hideSpinner(); // Ausblenden des Ladebalkens
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
    hideSpinner(); // Ausblenden des Ladebalkens
  }
}


function getLocation() {
  const licensePlate = document.getElementById('licensePlate').value;
  if (navigator.geolocation) {
    showSpinner(); // Anzeigen des Ladebalkens
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      saveData(licensePlate, latitude, longitude).catch(error => {
        console.error(error);
      }).finally(() => {
        hideSpinner(); // Ausblenden des Ladebalkens unabhängig davon, ob das Speichern erfolgreich war oder nicht
      });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showSpinner() {
  document.querySelector('.spinner-border').classList.remove('d-none');
}

function hideSpinner() {
  document.querySelector('.spinner-border').classList.add('d-none');
}

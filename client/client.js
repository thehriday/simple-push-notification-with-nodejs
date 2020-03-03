const publicVapidKey =
  "BE3T0NwEJRHmfbj3oUkG3H-LMr5lfgXREvV-yaZEjMjGnWJ9a04XDRwjpIg_QcLx3WVZkltXOxnSpiypHhXm17I";

//Check for service worker

if ("serviceWorker" in navigator) {
  send();
}

//Register SW, Register Push, Send Push
async function send() {
  try {
    const register = await navigator.serviceWorker.register("./worker.js", {
      scope: "/"
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

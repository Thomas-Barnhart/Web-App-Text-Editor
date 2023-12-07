const butInstall = document.getElementById('buttonInstall');

// Event listener for the 'beforeinstallprompt' event, triggered when the browser
// determines that the app is installable. The event is stored for later use.
window.addEventListener("beforeinstallprompt", (event) => {
    // Store the triggered event for deferred installation.
    window.deferredPrompt = event;
  
    // Show the installation button to the user.
    butInstall.classList.toggle("hidden", false);
  });
  
  // Event listener for the click event on the installation button.
  butInstall.addEventListener("click", async () => {
    // Retrieve the stored 'beforeinstallprompt' event.
    const promptEvent = window.deferredPrompt;
  
    // Check if the event is available.
    if (!promptEvent) {
      return;
    }
  
    // Show the installation prompt to the user.
    promptEvent.prompt();
  
    // Reset the deferred prompt variable (can only be used once).
    window.deferredPrompt = null;
  
    // Hide the installation button after the prompt is shown.
    butInstall.classList.toggle("hidden", true);
  });
  
  // Event listener for the 'appinstalled' event, triggered when the PWA has been
  // successfully installed on the user's device.
  window.addEventListener("appinstalled", (event) => {
    // Clear the deferred installation prompt once the app is installed.
    window.deferredPrompt = null;
  });
  
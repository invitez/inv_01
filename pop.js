document.addEventListener('DOMContentLoaded', () => {
  const okButton = document.querySelector('.ok-button');
  if (okButton) {
      okButton.addEventListener('click', () => {
          if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ action: 'changeBackground' }, '*');
          } else {
              alert("Parent window is closed. Please reopen the main window.");
          }
          window.close();
      });
  }
});

function closePopup() {
  if (window.opener && !window.opener.closed) {
      window.opener.postMessage("popupClosed", "*");
  }
  window.close();
}
/**
 * Global error handler to filter out browser extension errors
 * and other non-critical errors that clutter the console
 */

// Filter out common browser extension errors
const isExtensionError = (error) => {
  const errorStr = error.toString().toLowerCase();
  return (
    errorStr.includes('contentscript') ||
    errorStr.includes('extension') ||
    errorStr.includes('speechrecognition') ||
    errorStr.includes('webkitspeechrecognition') ||
    errorStr.includes('chrome-extension') ||
    errorStr.includes('moz-extension')
  );
};

// Global error handler
window.addEventListener('error', (event) => {
  // Check if this is an extension error
  if (isExtensionError(event.error) || isExtensionError(event.message)) {
    console.log('🔇 [ErrorHandler] Suppressed browser extension error:', event.message);
    event.preventDefault(); // Prevent the error from being logged
    return false;
  }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  // Check if this is an extension error
  if (isExtensionError(event.reason)) {
    console.log('🔇 [ErrorHandler] Suppressed browser extension promise rejection:', event.reason);
    event.preventDefault(); // Prevent the error from being logged
    return false;
  }
});

console.log('🛡️ [ErrorHandler] Global error filtering initialized');
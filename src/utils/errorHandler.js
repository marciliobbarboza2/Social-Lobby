/**
 * Global error handler to filter out browser extension errors
 * and other non-critical errors that clutter the console
 */

// Filter out common browser extension errors
const isExtensionError = (error) => {
  const errorStr = error.toString().toLowerCase();
  const messageStr = (error.message || '').toLowerCase();
  const stackStr = (error.stack || '').toLowerCase();
  
  return (
    errorStr.includes('contentscript') ||
    errorStr.includes('extension') ||
    errorStr.includes('speechrecognition') ||
    errorStr.includes('webkitspeechrecognition') ||
    errorStr.includes('chrome-extension') ||
    errorStr.includes('moz-extension') ||
    messageStr.includes('speechrecognition') ||
    messageStr.includes('webkitspeechrecognition') ||
    stackStr.includes('contentscript') ||
    stackStr.includes('extension')
  );
};

// Override console.error to filter extension errors
const originalError = console.error;
console.error = function(...args) {
  const errorMessage = args.join(' ');
  if (isExtensionError({ toString: () => errorMessage, message: errorMessage })) {
    console.log('🔇 [ErrorHandler] Suppressed extension error:', errorMessage.substring(0, 100) + '...');
    return;
  }
  originalError.apply(console, args);
};

// Global error handler
window.addEventListener('error', (event) => {
  // Check if this is an extension error
  if (isExtensionError(event.error) || isExtensionError({ message: event.message })) {
    console.log('🔇 [ErrorHandler] Suppressed browser extension error:', event.message.substring(0, 100) + '...');
    event.preventDefault(); // Prevent the error from being logged
    return false;
  }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  // Check if this is an extension error
  if (isExtensionError(event.reason)) {
    console.log('🔇 [ErrorHandler] Suppressed browser extension promise rejection:', event.reason.toString().substring(0, 100) + '...');
    event.preventDefault(); // Prevent the error from being logged
    return false;
  }
});

console.log('🛡️ [ErrorHandler] Enhanced global error filtering initialized');
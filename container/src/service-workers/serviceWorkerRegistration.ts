/**
 * serviceWorkerRegistration.ts:
 * Handles the registration of the service worker
 * Provides functions to enable/disable service worker
 * Manages the service worker lifecycle
 * Stores the service worker state in localStorage
 */

// Log styles for better console visibility
const logStyles = {
  success: 'background: #4CAF50; color: white; padding: 2px 5px; border-radius: 2px;',
  error: 'background: #f44336; color: white; padding: 2px 5px; border-radius: 2px;',
  info: 'background: #2196F3; color: white; padding: 2px 5px; border-radius: 2px;',
  warning: 'background: #ff9800; color: white; padding: 2px 5px; border-radius: 2px;'
};

export const registerServiceWorker = () => {
  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const swResponse = await fetch('/sw.js');
        if (!swResponse.ok) {
          throw new Error(`Service Worker file not found: ${swResponse.status}`);
        }
        // Register the service worker from the root directory
        const registration = await navigator.serviceWorker.register('/sw.js',{
          scope: '/'
        });
         console.group('Service Worker Registration Details');
        console.log('Registration successful:', registration);
        console.log('Scope:', registration.scope);
        console.log('State:', registration.active?.state || 'initializing');
        console.groupEnd();
        
        // Store that SW is enabled
        localStorage.setItem('swEnabled', 'true');
        
        // Log initial state
        if (registration.active) {
          console.log('%c👷 Service Worker is active', logStyles.success);
        }
        
        // Handle installation
        registration.addEventListener('install', (event) => {
          console.log('%c🔧 Service Worker installing...', logStyles.info);
        });

        // Handle activation
        registration.addEventListener('activate', (event) => {
          console.log('%c🚀 Service Worker activated', logStyles.success);
        });
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('%c🔄 New Service Worker found', logStyles.info);
          
          if (newWorker) {
            console.group('Update Progress:');
            newWorker.addEventListener('statechange', () => {
              console.log('⚡ New worker state:', newWorker.state);
              
              switch (newWorker.state) {
                case 'installing':
                  console.log('📥 Installing new version...');
                  break;
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    console.log('%c✨ New version installed and ready', logStyles.success);
                  }
                  break;
                case 'activating':
                  console.log('🔄 Activating new version...');
                  break;
                case 'activated':
                  console.log('%c✅ New version activated', logStyles.success);
                  break;
                case 'redundant':
                  console.log('%c⚠️ New worker became redundant', logStyles.warning);
                  break;
              }
            });
            console.groupEnd();
          }
        });

        // Log any controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('%c🔄 Service Worker controller changed', logStyles.info);
        });

      } catch (error) {
        console.group('%c❌ Service Worker Registration Failed', logStyles.error);
        console.error('Error details:', error);
        console.trace('Stack trace:');
        console.groupEnd();
      }
    });
  } else {
    console.log('%c⚠️ Service workers are not supported in this browser', logStyles.warning);
  }
};

// Function to unregister service worker
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const unregistered = await registration.unregister();
      
      console.group('%c🔧 Service Worker Unregistration', logStyles.info);
      if (unregistered) {
        console.log('%c✅ Successfully unregistered', logStyles.success);
      } else {
        console.log('%c⚠️ Unregistration failed', logStyles.warning);
      }
      console.groupEnd();
      
      localStorage.setItem('swEnabled', 'false');
      
    } catch (error:any) {
      console.group('%c❌ Service Worker Registration Failed', 'background: #f44336; color: white;');
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.groupEnd();
    }
  }
};

// Check if service worker is enabled
export const isServiceWorkerEnabled = (): boolean => {
  const enabled = localStorage.getItem('swEnabled') === 'true';
  console.log(
    `%c${enabled ? '✅ Service Worker is enabled' : '⚫ Service Worker is disabled'}`,
    enabled ? logStyles.success : logStyles.info
  );
  return enabled;
};

// Debug helper function
export const debugServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    
    console.group('🔍 Service Worker Debug Info');
    console.log('Registration:', registration);
    console.log('Controller:', navigator.serviceWorker.controller);
    console.log('Ready state:', registration?.active?.state);
    console.log('Scope:', registration?.scope);
    console.groupEnd();
  }
}; 
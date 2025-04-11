import { createRoot } from 'react-dom/client';
import App from './App';
import { measurePerformance } from './service-workers/performanceMetrics';
import {
  debugServiceWorker,
  isServiceWorkerEnabled,
  registerServiceWorker
} from './service-workers/serviceWorkerRegistration';

const checkServiceWorkerFile = async () => {
  try {
    const response = await fetch('/sw.js');
    if (!response.ok) {
      console.error('❌ Service Worker file not found:', response.status);
      console.group('Service Worker File Check');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('URL:', response.url);
      console.groupEnd();
      return false;
    }
    console.log('✅ Service Worker file found');
    return true;
  } catch (error) {
    console.error('❌ Error checking Service Worker file:', error);
    return false;
  }
};

const mount = async () => {
  try {
    const swFileExists = await checkServiceWorkerFile();
    
    if (swFileExists) {
      localStorage.setItem('swEnabled', 'true');
      if (isServiceWorkerEnabled()) {
        await registerServiceWorker();
        await debugServiceWorker();
      }
    } else {
      console.warn('⚠️ Service Worker registration skipped due to missing file');
    }

    measurePerformance().then((metrics) => {
      console.log('Performance metrics:', metrics);
    });

    const container = document.getElementById('root');

    if (!container) {
      throw new Error('Failed to find the root element');
    }

    const root = createRoot(container);

    root.render(
      <App />
    );
  } catch (error) {
    console.error('❌ Mount error:', error);
  }
};

mount().catch(error => {
  console.error('Failed to mount application:', error);
});
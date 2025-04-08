import { createRoot } from 'react-dom/client';
import App from './App';
import { measurePerformance } from './service-workers/performanceMetrics';
import {
  debugServiceWorker,
  isServiceWorkerEnabled,
  registerServiceWorker
} from './service-workers/serviceWorkerRegistration';

const mount = () => {
  //Force enable service worker for testing
  localStorage.setItem('swEnabled', 'true');
  if (isServiceWorkerEnabled()) {
    registerServiceWorker();
    debugServiceWorker();
  }
  //start performance metrics measurement
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
};

mount();
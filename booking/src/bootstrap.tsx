import { createRoot } from 'react-dom/client';
import App from './App';

const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(<App />);
};

// If we are in development and running in isolation
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_book-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// Export the mount function for the container to use
export { mount };

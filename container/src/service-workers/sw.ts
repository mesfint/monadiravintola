/**
 * sw.ts (Service Worker):
 * Implements basic caching strategy with focus on images
 * Handles three main events:
 * - install: Caches static assets and critical images
 * - activate: Cleans up old caches
 * - fetch: Serves cached responses when available
 */

declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = 'v1';
const CACHE_NAME = `monadi-restaurant-${CACHE_VERSION}`;

// Define which image types to cache
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

const FALLBACK_ASSETS = {
  image: '/assets/placeholder.jpg',
};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/LOGO.png',
  '/assets/hero-image.jpg',
  '/assets/menu-background.jpg',
  FALLBACK_ASSETS.image,
];

// Helper function to check if request is for remote content
const isRemoteRequest = (url: string): boolean => {
  return url.includes('localhost:3001');
};

// Helper function to check if request is for an image
const isImageRequest = (request: Request): boolean => {
  return request.destination === 'image' || 
         IMAGE_EXTENSIONS.some(ext => request.url.toLowerCase().endsWith(ext));
};

// Helper function to check if request is cacheable
const isCacheableRequest = (request: Request): boolean => {
  const url = new URL(request.url);
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return false;
  }

  // Add other schemes we want to skip
  const invalidSchemes = ['chrome-extension:', 'chrome:', 'chrome-search:'];
  if (invalidSchemes.includes(url.protocol)) {
    return false;
  }

  return true;
};

// Handle image fetching with proper CORS and cache handling
const handleImageFetch = async (request: Request): Promise<Response> => {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('🖼️ Serving cached image:', request.url);
      return cachedResponse;
    }

    // For remote requests (from port 3001), modify the fetch request
    if (isRemoteRequest(request.url)) {
      const modifiedRequest = new Request(request.url, {
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      
      try {
        const networkResponse = await fetch(modifiedRequest);
        if (networkResponse.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, networkResponse.clone());
          console.log('💾 Cached new remote image:', request.url);
          return networkResponse;
        }
      } catch (error) {
        console.log('⚠️ Remote image fetch failed, using fallback:', error);
        return await handleImageFallback(request);
      }
    }

    // For local requests, proceed normally
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
      console.log('💾 Cached new local image:', request.url);
      return networkResponse;
    }

    return await handleImageFallback(request);
  } catch (error) {
    console.error('❌ Image fetch failed:', error);
    return await handleImageFallback(request);
  }
};

// Fallback handler for failed image requests
const handleImageFallback = async (request: Request): Promise<Response> => {
  console.log('🔄 Using fallback for:', request.url);
  
  // Try to serve a placeholder image
  const placeholderUrl = '/assets/placeholder.jpg';
  const placeholderResponse = await caches.match(placeholderUrl);
  
  if (placeholderResponse) {
    return placeholderResponse;
  }
  
  // If no placeholder in cache, return a basic response
  return new Response('Image not available', { 
    status: 404,
    statusText: 'Image not found'
  });
};

// Handle normal fetch requests
const handleNormalFetch = async (request: Request): Promise<Response> => {
  try {
    // Skip non-cacheable requests
    if (!isCacheableRequest(request)) {
      return fetch(request);
    }

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('📦 Serving from cache:', request.url);
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      // Only cache if it's a valid scheme
      if (isCacheableRequest(request)) {
        try {
          await cache.put(request, networkResponse.clone());
          console.log('💾 Cached new resource:', request.url);
        } catch (error) {
          console.warn('⚠️ Failed to cache resource:', request.url, error);
        }
      }
      return networkResponse;
    }

    return networkResponse;
  } catch (error) {
    console.error('❌ Fetch failed:', error);
    return new Response('Resource not available', { status: 404 });
  }
};

// Install event: Cache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching static assets and critical images');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('❌ Pre-caching failed:', error);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => {
            if (name !== CACHE_NAME) {
              console.log('🧹 Service Worker: Removing old cache:', name);
              return caches.delete(name);
            }
          })
        );
      })
  );
});

// Fetch event: Handle requests
self.addEventListener('fetch', (event: FetchEvent) => {
  const request = event.request;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle images differently
  if (isImageRequest(request)) {
    event.respondWith(handleImageFetch(request));
    return;
  }

  // Handle all other requests
  event.respondWith(handleNormalFetch(request));
});

// Log any errors that occur within the Service Worker
self.addEventListener('error', (error) => {
  console.error('🔥 Service Worker error:', error);
});
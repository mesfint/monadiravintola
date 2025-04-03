
/**
 Measures key performance metrics:
Page Load Time: Total time to load the page
First Contentful Paint (FCP): Time when first content appears
Largest Contentful Paint (LCP): Time when main content appears
 */
export interface PerformanceMetrics {
    pageLoadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  }
  
  export const measurePerformance = (): Promise<PerformanceMetrics> => {
    return new Promise((resolve) => {
      let metrics: Partial<PerformanceMetrics> = {};
      
      // Page load time
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        metrics.pageLoadTime = navigation.loadEventEnd;
      });
  
      // First Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          metrics.firstContentfulPaint = entries[0].startTime;
        }
      }).observe({ type: 'paint', buffered: true });
  
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          metrics.largestContentfulPaint = entries[0].startTime;
          
          // Once we have LCP, we can consider metrics complete
          resolve(metrics as PerformanceMetrics);
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
  };
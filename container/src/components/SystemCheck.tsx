import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';

interface SystemStatus {
  serviceWorker: {
    isRegistered: boolean;
    scope: string | null;
    state: string | null;
    scriptURL: string | null;
  };
  caches: {
    name: string;
    itemCount: number;
  }[];
  performance: {
    totalLoadTime: number;
    domContentLoaded: number;
    firstByte: number;
    cacheUsage: string;
  };
}

export const SystemCheck: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const runCheck = async () => {
    
    const registration = await navigator.serviceWorker.getRegistration();
    const swStatus = {
      isRegistered: !!registration,
      scope: registration?.scope || null,
      state: registration?.active?.state || null,
      scriptURL: registration?.active?.scriptURL || null
    };


    const cacheKeys = await caches.keys();
    const cacheStatus = await Promise.all(
      cacheKeys.map(async (key) => {
        const cache = await caches.open(key);
        const requests = await cache.keys();
        return {
          name: key,
          itemCount: requests.length
        };
      })
    );

    
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const perfStatus = {
      totalLoadTime: navEntry.loadEventEnd - navEntry.startTime,
      domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.startTime,
      firstByte: navEntry.responseStart - navEntry.requestStart,
      cacheUsage: navEntry.transferSize === 0 ? 'From Cache' : 'Network'
    };

    setStatus({
      serviceWorker: swStatus,
      caches: cacheStatus,
      performance: perfStatus
    });
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 1000 }}>
      <Button 
        variant="contained" 
        onClick={() => setIsVisible(!isVisible)}
        sx={{ mb: 1 }}
      >
        {isVisible ? 'Hide' : 'Show'} System Status
      </Button>

      {isVisible && (
        <Paper sx={{ p: 2, maxWidth: 400 }}>
          <Button onClick={runCheck} variant="outlined" sx={{ mb: 2 }}>
            Run Check
          </Button>

          {status && (
            <Box>
              <Typography variant="h6">Service Worker</Typography>
              <pre>{JSON.stringify(status.serviceWorker, null, 2)}</pre>

              <Typography variant="h6">Caches</Typography>
              <pre>{JSON.stringify(status.caches, null, 2)}</pre>

              <Typography variant="h6">Performance</Typography>
              <pre>{JSON.stringify(status.performance, null, 2)}</pre>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
}; 
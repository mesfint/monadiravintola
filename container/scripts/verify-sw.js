// scripts/verify-sw.js
const fs = require('fs');
const path = require('path');

const verifyServiceWorker = () => {
  console.group('🔍 Service Worker Verification');
  
  // Check dist directory
  const distPath = path.resolve(__dirname, '../dist/sw.js');
  console.log('\nChecking dist directory...');
  
  if (fs.existsSync(distPath)) {
    const stats = fs.statSync(distPath);
    console.log('✅ Service Worker found in dist/');
    console.log('📊 Size:', (stats.size / 1024).toFixed(2), 'KB');
    console.log('🕒 Modified:', stats.mtime.toLocaleString());
    
    // Read and verify content
    const content = fs.readFileSync(distPath, 'utf8');
    const isValidSW = content.includes('self.addEventListener');
    
    if (isValidSW) {
      console.log('✅ Service Worker content verified');
    } else {
      console.warn('⚠️ Service Worker might be invalid - missing event listeners');
    }
  } else {
    console.error('❌ Service Worker missing from dist/');
    console.log('\n🔧 Run "npm run build:sw" to rebuild');
    process.exit(1);
  }

  // Check source file
  const sourcePath = path.resolve(__dirname, '../src/service-workers/sw.ts');
  console.log('\nChecking source file...');
  
  if (fs.existsSync(sourcePath)) {
    console.log('✅ Source file found in src/service-workers/');
  } else {
    console.error('❌ Source file missing');
    process.exit(1);
  }

  // Check webpack config
  const configPath = path.resolve(__dirname, '../config/webpack.sw.config.js');
  console.log('\nChecking webpack config...');
  
  if (fs.existsSync(configPath)) {
    console.log('✅ Webpack config found');
  } else {
    console.error('❌ Webpack config missing');
    process.exit(1);
  }

  console.groupEnd();
};

try {
  verifyServiceWorker();
  console.log('\n✨ Service Worker verification complete!');
} catch (error) {
  console.error('\n❌ Verification failed:', error);
  process.exit(1);
}
require('dotenv').config();

// Manually set NODE_ENV if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 

console.log('=== ENV TEST ===');
console.log('DEV_CONTAINER:', process.env.DEV_CONTAINER);
console.log('NODE_ENV:', process.env.NODE_ENV);
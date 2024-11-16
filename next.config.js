
const withPWA = require('next-pwa')({
    dest: 'public', // This is where the generated service worker will go
    register: true, // Automatically register the service worker
    skipWaiting: true, // Immediately activate a new service worker when it becomes available
  });
  
  module.exports = withPWA({
    reactStrictMode: true, // Your other Next.js configuration here
  });
  
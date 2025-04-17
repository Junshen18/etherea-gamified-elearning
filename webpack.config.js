const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // ... other configurations ...
  plugins: [
    // Only include Workbox in production
    ...(process.env.NODE_ENV === 'production' ? [
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    ] : []),
  ],
}; 
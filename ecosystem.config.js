/**
 * PM2 Ecosystem Configuration for Sitovia Website
 * 
 * ⚠️ IMPORTANT: Update 'cwd' path before deployment
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 restart sitovia-website
 *   pm2 logs sitovia-website
 */

module.exports = {
  apps: [
    {
      name: 'sitovia-website',
      
      // Use 'node' directly with Next.js server (faster than 'npm start')
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      
      // ⚠️ UPDATE THIS PATH to your actual deployment directory
      cwd: '/var/www/sitovia',
      
      // Single instance (Next.js already optimized for production)
      instances: 1,
      exec_mode: 'fork', // Use 'fork' mode for Next.js
      
      // Auto-restart on crash
      autorestart: true,
      watch: false, // Don't watch files in production
      max_memory_restart: '1G',
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      
      // Logging configuration
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
};

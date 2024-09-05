const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ['drive.google.com'], // Add Google Drive domain here
    },
    async headers() {
      return [
        {
          source: '/og-image.jpg',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
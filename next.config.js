/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-content-type-options',
            value: 'nosniff',
          },
          { key: 'x-xss-protection', value: '1' },
          { key: 'x-frame-options', value: 'DENY' },
          {
            key: 'strict-transport-security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [],
    }
  },
}

module.exports = nextConfig

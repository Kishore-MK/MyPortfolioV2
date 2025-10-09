import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
  {
    protocol: 'https',
    hostname: 'placehold.co',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'gateway.pinata.cloud',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'azure-biological-skink-274.mypinata.cloud',
    port: '',
    pathname: '/ipfs/**',
  },
  {
    protocol: 'https',
    hostname: 'ipfs.io',
    port: '',
    pathname: '/ipfs/**',
  },
],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

const AllowedImageWordpressDomain = new URL(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL).hostname;

const nextConfig = {
    images: {
        domains:[AllowedImageWordpressDomain]
    }
}

module.exports = nextConfig

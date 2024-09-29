/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{

        domains: ['res.cloudinary.com','static.wixstatic.com'],
    },
    routes: [
        {
          src: '/categories/:categoryId/products',
          dest: '/categories/[categoryId]/products',
        },
      ],
};

export default nextConfig;

'use client';
import { useState, useEffect } from 'react';

export const navLinks = [
  {
    id: 'home',
    title: 'Home',
    slug: '/',
  },
  {
    id: 'partners',
    title: 'Our Partners',
    slug: '/partners',
  },
  {
    id: 'services',
    title: 'Services',
    slug: '/services',
    children: [
      {
        id: 'service-1',
        title: 'Service 1',
        slug: '/services/service-1',
      },
      {
        id: 'service-2',
        title: 'Service 2',
        slug: '/services/service-2',
      },
      {
        id: 'service-3',
        title: 'Service 3',
        slug: '/services/service-3',
      },
      {
        id: 'service-4',
        title: 'Service 4',
        slug: '/services/service-4',
      },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    slug: '/products',
    children: [], // Initially empty, will be populated from API
  },
  {
    id: 'about',
    title: 'About',
    slug: '/about',
  },
  {
    id: 'contact',
    title: 'Contact',
    slug: '/contact',
  },
];

export default function useNavLinks() {
  const [links, setLinks] = useState(navLinks);

  // Fetch products from the Strapi API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337';
        const response = await fetch(`${baseUrl}/api/products`);
        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error('Unexpected API response structure');
        }

        const products = data.data.map((product: any) => ({
          id: product.id,
          title: product.attributes.productTitle,
          slug: `/products/${product.attributes.slug}`, // Ensure slug is present in your API
        }));

        // Update 'products' in navLinks
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.id === 'products'
              ? { ...link, children: products }
              : link
          )
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return links;
}

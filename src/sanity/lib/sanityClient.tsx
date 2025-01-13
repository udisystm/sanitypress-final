import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { groq } from 'next-sanity';
import { client } from '../client';

export const sanityClient = createClient({
  projectId: 'py28v9g1',
  dataset: 'production',
  token: 'skk3NvJGb7ZOImuLQrUIlAXI65TNlO7Xj3bK89iaf3oVk7MXZYwXAWtlwt0DHkBmmsAxgoRo9hj1O2CqxtI9VFttdbuFw6sAKRKXwVwb5owbngnvXVHzcKZ8NLlbSTeOFyWSa0bfp5HVd5cgnX1lOPYhqwOvxIng7XB0uRfp31f9UbH04U8N',
  useCdn: true,
  apiVersion: '2023-01-01', // Replace with your preferred version
});
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getStaticProps() {
  const headerData = await client.fetch(
    groq`*[_type == "header2"][0]{
      logo {
        asset -> {
          url
        }
      },
      navigationItems[] {
        _key,
        label,
        href
      },
      ctaButton {
        label,
        href
      }
    }`
  );

  return {
    props: {
      headerData,
    },
  };
}


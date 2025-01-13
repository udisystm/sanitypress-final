import { createClient } from 'next-sanity'

// Ensure the environment variables are set in .env.local
export const client = createClient({
	projectId: 'py28v9g1', // From .env.local
	dataset: 'production', // From .env.local
	apiVersion: '2024-11-01', // Sanity API version
	useCdn: true, // Use CDN for public data fetching
})

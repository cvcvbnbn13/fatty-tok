import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'ujao7822',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false, //`false` if you want to ensure fresh data
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

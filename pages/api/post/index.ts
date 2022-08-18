import type { NextApiRequest, NextApiResponse } from 'next';
import { allPostsQuery } from '@utils/queries';
import { client } from '@utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const query = allPostsQuery();

    const data = await client.fetch(query);

    res.status(200).json(data);
  } else if (req.method === 'POST') {
    // from page upload.tsx
    const document = req.body;

    client.create(document).then(() => res.status(201).json('Video Created'));
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';

import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from '@utils/queries';

import { client } from '@utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    const query = singleUserQuery(userId);
    const useVideosquery = userCreatedPostsQuery(userId);
    const useLikedVideosQuery = userLikedPostsQuery(userId);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(useVideosquery);
    const userLikeVideos = await client.fetch(useLikedVideosQuery);

    res.status(200).json({ user: user[0], userVideos, userLikeVideos });
  }
}

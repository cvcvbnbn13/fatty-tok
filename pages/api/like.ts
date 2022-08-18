import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '@utils/client';

// client.patch example

// client.patch()
// [operations]
// .commit(mutationOptions)

// client.patch('bike-123').setIfMissing({title: 'Untitled bike'}).commit()
// client.patch('bike-123').unset(['title', 'price']).commit()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    const data = like
      ? await client
          .patch(postId) // Document ID to patch
          .setIfMissing({ likes: [] })
          .insert('after', 'likes[-1]', [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId) // Document ID to patch
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
    res.status(200).json(data);
  }
}

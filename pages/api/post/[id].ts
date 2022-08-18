import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';

import { postDetailQuery } from '@utils/queries';
import { client } from '@utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const query = postDetailQuery(id);

    // client.fetch去找符合篩選的資料
    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if (req.method === 'PUT') {
    const { comment, postedBy } = req.body;
    const { id }: any = req.query;

    const data = await client
      .patch(id) // Document ID to patch
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: 'postedBy', _ref: postedBy },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
}

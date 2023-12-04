// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import init from '../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await init();

  const data = await db.all('SELECT * FROM produk');

  res.status(200).json(data);
}

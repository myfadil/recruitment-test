// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import init from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await init();

  if (req.method === 'GET') {
    // Read Operation
    const product = await db.all('SELECT produk.*, suplier.nama_suplier FROM produk INNER JOIN suplier ON produk.suplier_id = suplier.id_suplier');
    console.log(product)
    res.status(200).json({ data: product });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  db.close();
}

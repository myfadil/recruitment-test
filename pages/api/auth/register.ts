import { NextApiRequest, NextApiResponse } from 'next';
import init from '../../../db';

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const db = await init()

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama_suplier, alamat, email} = req.body;
  
  let checkEmail = await db.get('SELECT * FROM suplier WHERE email = ?', email)

  if (checkEmail) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  await db.run('INSERT INTO suplier (nama_suplier, alamat, email) VALUES (?, ?, ?)', [nama_suplier, alamat, email]);

  res.status(200).json({ message: 'User registered successfully' });
};

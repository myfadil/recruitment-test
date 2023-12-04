import { NextApiRequest, NextApiResponse } from 'next';
import init from '../../../db';
import fs from 'fs';
import path from 'path';

const deleteFilesWithSameName = (directoryPath: string, id: any): void => {
  fs.readdir(directoryPath, (err, files) => {
      if (err) {
          console.error(`Error reading directory: ${err}`);
          return;
      }

      const matchingFiles = files.filter((file) => {
          const fileNameWithoutExtension = path.parse(file).name;
          return fileNameWithoutExtension === id;
      });

      matchingFiles.forEach((file) => {
          const filePath = path.join(directoryPath, file);
          fs.unlink(filePath, (err) => {
              if (err) {
                  console.error(`Error deleting file ${file}: ${err}`);
              } else {
                  console.log(`File ${file} deleted successfully`);
              }
          });
      });
  });
};

const directoryPath = 'public/uploads/products/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const db = await init();

  if (req.method === 'GET') {
    const product = await db.get('SELECT * FROM produk WHERE id = ?', id);
    res.status(200).json({ data: product });
  } else if (req.method === 'DELETE') {
    await db.run('DELETE FROM produk WHERE id = ?', id);
    await deleteFilesWithSameName(directoryPath, id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  db.close();
}

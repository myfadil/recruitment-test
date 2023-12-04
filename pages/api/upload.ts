// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';

// Tentukan tujuan penyimpanan dan nama file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/products');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Inisialisasi objek Multer dengan konfigurasi
const upload = multer({ storage: storage });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Gunakan middleware Multer untuk menangani pengungahan file
  upload.single('foto')(req as any, res as any, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
    // Lakukan sesuatu setelah berhasil mengunggah file
    return res.status(200).json({ message: 'File uploaded successfully' });
  });
}

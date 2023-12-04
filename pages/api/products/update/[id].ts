// pages/api/upload.ts
import multer from 'multer';
import path from 'path';
import init from '../../../../db';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
}

const deleteFilesWithSameName = (directoryPath: string, id: any): void => {
  fs.readdir(directoryPath, (err, files) => {
      if (err) {
          console.error(`Error reading directory: ${err}`);
          return;
      }

      // Filter file dengan nama yang sama
      const matchingFiles = files.filter((file) => {
          const fileNameWithoutExtension = path.parse(file).name;
          return fileNameWithoutExtension === id;
      });

      // Hapus setiap file yang sesuai
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

// Contoh pemanggilan fungsi
const directoryPath = 'public/uploads/products/';


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

export default async function multerUpload(req :any, res : any) {
  const db = await init();
  const {id} = req.query
  await deleteFilesWithSameName(directoryPath, id);
  // Gunakan middleware Multer untuk menangani pengungahan file
  upload.single('foto')(req as any, res as any, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    // Lakukan sesuatu setelah berhasil mengunggah file
    const { nama, deskripsi, harga, stok, suplier_id } = req.body;
    const {id} = req.query
    

    console.log('ini body', req.body);
    console.log('ini file', req.file);
    
    if (!nama || !deskripsi || !harga || !stok || !suplier_id) {
      return res.status(404).json({ "message": "input required" });
    }
    
    // Insert data ke database
    const result = await db.run(
      'UPDATE produk SET nama = ?, deskripsi = ?, harga = ?, stok = ?, suplier_id = ? WHERE id = ?', [nama, deskripsi, harga, stok, suplier_id, id]
    );
    
    // Peroleh id_produk dari hasil operasi insert
    const id_produk = id;
    console.log(id_produk)

    // Lakukan operasi untuk menamai file sesuai dengan {id_produk}.extension
    const extension = path.extname(req.file.originalname);
    const newFilename = `${id_produk}${extension}`;

    
    // Ubah nama file di sistem penyimpanan
    const newFilePath = path.join('public/uploads/products', newFilename);
    fs.renameSync(req.file.path, newFilePath);

    // Ubah path file pada data yang akan disimpan di database
    const foto_url = `http://${req.headers.host}/uploads/products/${newFilename}`;

    // Update kolom foto di database dengan path yang baru
    await db.run('UPDATE produk SET foto = ? WHERE id = ?', [foto_url, id_produk]);

    const data = {
      nama: nama,
      deskripsi: deskripsi,
      harga: harga,
      stok: stok,
      suplier_id: suplier_id,
      foto: foto_url,
    };

    console.log(data);

    return res.status(200).json({ message: 'Update Product successfully', data: data });
  });
}

// export default async function multerUpload(req: NextApiRequest, res: NextApiResponse) {
//   const db = await init();
//   // Gunakan middleware Multer untuk menangani pengungahan file
//   upload.single('foto')(req as any, res as any, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Error uploading file' });
//     }

//     // Lakukan sesuatu setelah berhasil mengunggah file
//     const { nama, deskripsi, harga, stok, suplier_id } = req.body;
//     if (!nama || !deskripsi || !harga || !stok || !suplier_id) {
//       return res.status(404).json({ "message": "input required" });
//   }
//     let url = "http://" + req.headers.host;
//     let foto_url = url + "/uploads/products/" + req.file.filename

//     let data = {
//       nama : nama,
//       deskripsi : deskripsi,
//       harga : harga,
//       stok : stok,
//       suplier_id : suplier_id,
//       foto : foto_url
//     }

//     console.log(data)
//     let result = db.run(
//       'INSERT INTO produk (nama, deskripsi, harga, stok, foto, suplier_id) VALUES (?, ?, ?, ?, ?, ?)',
//       [nama, deskripsi, harga, stok, foto_url, suplier_id]
//     );
    
//     return res.status(200).json({ message: 'Created Product successfully' , data: data });
//   });
// }



// -------------------------------------------------------------------------------------

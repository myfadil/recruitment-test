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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/products');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

});
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Batasan ukuran file menjadi 2 MB
  fileFilter: (req, file, cb) => {
    const allowedFileExtensions = ['.png', '.jpg', '.jpeg'];

    // Periksa ekstensi file
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileExtensions.includes(extname)) {
      return cb(null, true);
    } else {
      return cb(new Error('Only .png, .jpg, and .jpeg files are allowed'));
    }
  },
});

export default async function multerUpload(req :any, res : any) {
  const db = await init();
  const {id} = req.query
  await deleteFilesWithSameName(directoryPath, id);
  upload.single('foto')(req as any, res as any, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const { nama, deskripsi, harga, stok, suplier_id } = req.body;
    const {id} = req.query
    

    console.log('ini body', req.body);
    console.log('ini file', req.file);
    
    if (!nama || !deskripsi || !harga || !stok || !suplier_id) {
      return res.status(404).json({ "message": "input required" });
    }
    
    const result = await db.run(
      'UPDATE produk SET nama = ?, deskripsi = ?, harga = ?, stok = ?, suplier_id = ? WHERE id = ?', [nama, deskripsi, harga, stok, suplier_id, id]
    );

    const id_produk = id;
    console.log(id_produk)

    const extension = path.extname(req.file.originalname);
    const newFilename = `${id_produk}${extension}`;


    const newFilePath = path.join('public/uploads/products', newFilename);
    fs.renameSync(req.file.path, newFilePath);

    const foto_url = `http://${req.headers.host}/uploads/products/${newFilename}`;

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


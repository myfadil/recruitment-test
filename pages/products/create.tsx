// pages/products/create.tsx
import Navbar from '@/component/navbar/navbar';
import { useState } from 'react';
import { useSession } from 'next-auth/react'

const CreateProduct = () => {
  const{data} = useSession()

  const [foto, setFoto] = useState('');
  const [file, setFile] = useState<File>();
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    harga: '',
    stok: '',
    suplier_id: '',
    photo_url: '',
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
}

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if(!file) return;
      // Create FormData object to handle file upload
      const formDataObject = new FormData();
      formDataObject.append('nama', formData.nama);
      formDataObject.append('deskripsi', formData.deskripsi);
      formDataObject.append('harga', formData.harga);
      formDataObject.append('stok', formData.stok);
      formDataObject.append('foto', file);
      formDataObject.append('suplier_id', formData.suplier_id);

      console.log(formData)
      console.log(formDataObject)


      // Panggil API untuk membuat produk menggunakan metode POST
      const response = await fetch('/api/products/create', {
        method: 'POST',
        body: formDataObject,
      });

      if (response.ok) {
        console.log('Product created successfully');
        // Redirect atau lakukan aksi lain setelah produk dibuat
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <>
      <Navbar/>
    <div className='container'>
      <h1 className='text-center mt-3'>Create Product</h1>
      <form className='d-flex flex-column col-4' onSubmit={handleSubmit}>
        <label className='form-label'>
          Nama:
          <input className='form-control' type="text" name="nama" value={formData.nama} onChange={handleChange} />
        </label>
        <label className='form-label'>
          Deskripsi:
          <textarea className='form-control' name="deskripsi" value={formData.deskripsi} onChange={handleChange} />
        </label>
        <label className='form-label'>
          Harga:
          <input className='form-control' type="text" name="harga" value={formData.harga} onChange={handleChange} />
        </label>
        <label className='form-label'>
          Stok:
          <input className='form-control' type="text" name="stok" value={formData.stok} onChange={handleChange} />
        </label>
        <label className='form-label'>
          Foto:
          <input className='form-control' type="file" name="foto" accept=".png, .jpg, .jpeg" onChange={({target}) => {
            if (target.files) {
              setFile(target.files[0]);
              setFoto(URL.createObjectURL(target.files[0]));
              setFormData({ ...formData, photo_url: URL.createObjectURL(target.files[0]) })
            }
          }} />
          <div className='img-preview mt-3'>
            {foto ? (
              <img className='img-fluid img-thumbnail' style={{ width: '180px', height: '180px' }} src={foto} alt="Preview" />
            ) : (
              <p>Select image</p>
            )}
          </div>
        </label>
        <label className='form-label'>
          Suplier ID:
          <input className='form-control' type="text" name="suplier_id" value={formData.suplier_id} onChange={handleChange} />
        </label>
        <button className='btn btn-primary' type="submit">Create Product</button>
      </form>
    </div>
    </>
  );
};

export default CreateProduct;

// pages/products/[id].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MyNavbar from '@/component/navbar/navbar';

const ProductDetail = () => {
  const router = useRouter();
  const {push}=useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({
    id: '',
    nama: '',
    deskripsi: '',
    harga: '',
    stok: '',
    foto: '',
    suplier_id: '',
  });

  useEffect(() => {
    // Panggil API untuk mendapatkan detail produk menggunakan metode GET
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const productData = await response.json();
          console.log('Product data:', productData);
          setProduct(productData.data);
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      // Panggil API untuk menghapus produk menggunakan metode DELETE
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        push("/")
        // Redirect atau lakukan aksi lain setelah produk dihapus
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
    <MyNavbar/>
    <div className='container d-flex flex-column align-items-center gap-3'>
      <h1 className='text-center'>Product Detail</h1>
      <div className="card border-light d-flex justify-content-center" style={{ width: "18rem" }}>
            <img className="card-img-top img-fluid" style={{ height: "18rem" }} src={product.foto} alt={product.nama} />
            <div className="card-body">
              <h5 className="card-title">{product.nama}</h5>
              <p className="card-text">{product.deskripsi}</p>
              <p className="card-text">Rp. {product.harga}</p>
              <p className="card-text">Stok : {product.stok}</p>
              <p className='card-text'>Produk ID : {product.id}</p>
            </div>
          </div>
     

    </div>
    <div className='container d-flex gap-5 justify-content-center align-items-center'>
      {/* Tombol untuk memperbarui produk */}
      <Link href={`/products/update/${id}`} >
        <button className='btn btn-primary'>
          Update Product
        </button>
        </Link>

      {/* Tombol untuk menghapus produk */}
      <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
    </div>
    </>
  );
};

{/* <h1>Product Detail</h1>
<p>ID: {product.id}</p>
<p>Nama: {product.nama}</p>
<p>Deskripsi: {product.deskripsi}</p>
<p>Harga: {product.harga}</p>
<p>Stok: {product.stok}</p>
<p>Foto: {product.foto}</p>
<p>Suplier ID: {product.suplier_id}</p> */}
export default ProductDetail;

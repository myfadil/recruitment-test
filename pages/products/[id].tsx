// pages/products/[id].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProductDetail = () => {
  const router = useRouter();
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

  const handleUpdate = async () => {
    try {
      // Panggil API untuk memperbarui produk menggunakan metode PUT
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log('Product updated successfully');
        // Lakukan aksi lain setelah produk diperbarui
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Panggil API untuk menghapus produk menggunakan metode DELETE
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        // Redirect atau lakukan aksi lain setelah produk dihapus
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Detail</h1>
      <p>ID: {product.id}</p>
      <p>Nama: {product.nama}</p>
      <p>Deskripsi: {product.deskripsi}</p>
      <p>Harga: {product.harga}</p>
      <p>Stok: {product.stok}</p>
      <p>Foto: {product.foto}</p>
      <p>Suplier ID: {product.suplier_id}</p>

      {/* Tombol untuk memperbarui produk */}
      <Link href={`/products/update/${id}`} >Update Product</Link>

      {/* Tombol untuk menghapus produk */}
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
};

export default ProductDetail;

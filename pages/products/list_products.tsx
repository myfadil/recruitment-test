import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Definisikan interface untuk bentuk data produk
interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
  suplier_id: number;
  foto: string;
  nama_suplier: string;
  // Tambahkan properti lain sesuai kebutuhan
}

const ListProducts: React.FC = () => {
  // State untuk menyimpan hasil data
  const [products, setProducts] = useState<Product[]>([]);
  const {data} = useSession()
  console.log(data)

  useEffect(() => {
    // Lakukan permintaan data dengan fetch
    axios.get("/api/products/getAllProduk")
      .then((response) => {
        // Set state dengan data yang diterima
        setProducts(response.data.data);
        console.log(response.data.data);
      })
  }, []); // Masukkan array kosong agar useEffect dijalankan hanya sekali setelah render pertama

  return (
    <div className="container">
      <h1 className="text-center mb-4 mt-3">Daftar Produk</h1>
      {data ? (
      <div className="d-flex gap-3 ">
        {products.map((product) => (
          <div key={product.id} className="card border-light" style={{ width: "18rem", cursor: "pointer" }} onClick={() => window.location.href = `/products/${product.id}`}>
            <img className="card-img-top img-fluid" style={{ height: "18rem" }} src={product.foto} alt={product.nama} />
            <div className="card-body">
              <h5 className="card-title">{product.nama}</h5>
              <p className="card-text">{product.deskripsi}</p>
              <p className="card-text">Rp. {product.harga}</p>
              <p className="card-text">Stok : {product.stok}</p>
              <p className="card-text">Suplier : {product.nama_suplier}</p>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="d-flex gap-3 ">
        {products.map((product) => (
          <div key={product.id} className="card border-light" style={{ width: "18rem"}} >
            <img className="card-img-top img-fluid" style={{ height: "18rem" }} src={product.foto} alt={product.nama} />
            <div className="card-body">
              <h5 className="card-title">{product.nama}</h5>
              <p className="card-text">{product.deskripsi}</p>
              <p className="card-text">Rp. {product.harga}</p>
              <p className="card-text">Stok : {product.stok}</p>
              <p className="card-text">Suplier : {product.nama_suplier}</p>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default ListProducts;

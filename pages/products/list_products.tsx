// import React, { useEffect } from "react";

// export default function ListProducts() {
//   useEffect(() => {
//     fetch("/api/products/getAllProduk", { method: "GET" })
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   })
//   return <div>Ini halaman list product</div>;
// }

import axios from "axios";
import React, { useEffect, useState } from "react";

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
      <div className="d-flex gap-3 ">
        {/* Map melalui produk dan tampilkan informasi produk */}
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
    </div>
  );
};

export default ListProducts;

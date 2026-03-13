"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFromURL = searchParams.get("search") || "";

  useEffect(() => {
    setSearch(searchFromURL);
  }, [searchFromURL]);

  const API = "https://69afa822c63dd197feb9ba5e.mockapi.io/Addproducts";

  // Fetch products with search
  const fetchProducts = async (searchValue = "") => {
    try {
      setLoading(true);

      let url = API;

      
      if (searchValue) {
        url = `${API}?search=${searchValue}`;
      }

      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setNotFound(data);

      setProducts(data);
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(search);

      router.push(`/list?search=${search}`);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);
  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchProducts(search);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => router.push("/input")}
      >
        Add New Product
      </button>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
        }}
        className="border p-2 rounded mb-4"
      />
      

      <ul className="space-y-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-3 w-full rounded-md flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{product.title}</h2>
              <p>{product.desc}</p>
              <p>Price: ₹{product.baseprice}</p>
              <p>Discount: {product.discount}%</p>
            </div>

            <div className="flex gap-3 items-center">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => router.push(`/input?id=${product.id}`)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {products.length === 0 && <p className="text- mt-4">No products found</p>}
    </div>
  );
}

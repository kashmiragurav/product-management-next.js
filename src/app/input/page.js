// app/input/page.jsx
"use client"; // Must be the first line!

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InputPage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const router = useRouter();

  // Load saved data from localStorage on client
  useEffect(() => {
    const saved = localStorage.getItem("productInput");
    if (saved) setProduct(JSON.parse(saved));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("productInput", JSON.stringify(product));
  }, [product]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submit logic here, e.g., API call
    console.log("Submitting:", product);

    // Optionally redirect after submit
    router.push("/product-list");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Price:</label>
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
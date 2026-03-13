"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [baseprice, setBasePrice] = useState("");
  const [discount, setDiscount] = useState("");

  const discountAmount = (baseprice * discount) / 100;
  const actualPrice = baseprice - discountAmount;

  const API = "https://69afa822c63dd197feb9ba5e.mockapi.io/Addproducts";

  //fetch product if editing

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      const res = await fetch(`${API}/${productId}`);
      const data = await res.json();
      setTitle(data.title);
      setDesc(data.desc);
      setBasePrice(data.baseprice);
      setDiscount(data.discount);
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { title, desc, baseprice, discount };

    if (productId) {
      // Update
      await fetch(`${API}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    } else {
      // Add new
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    }

    router.push("/list");
  };

  return (
    <div className="flex justify-center w-full items-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-18 shadow-md w-full max-w-lg flex flex-col gap-4"
      >
        <h1 className="text-center text-4xl font-bold text-black-600">
          {productId ? "Edit Product" : "Add Product"}
        </h1>

        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-grey-500 p-3  w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          placeholder="Add Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border border-grey-500 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          placeholder="Base Price"
          value={baseprice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="border border-grey-500 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border border-grey-500 p-3  w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="bg-gray-100 p-3 ">
          <p className="text-sm text-gray-700" required>
            Discount Amount:{" "}
            <span className="font-semibold">{discountAmount}</span>
          </p>
          <p className="text-sm text-gray-700" required>
            Actual Price: <span className="font-semibold">{actualPrice}</span>
          </p>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2  hover:bg-green-600 transition"
        >
          {productId ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

const API ="https://69afa822c63dd197feb9ba5e.mockapi.io/Addproducts";

export const fetchProducts= async () => {
    const res = await fetch(API);
    const data =await res.json();
    return data;
};
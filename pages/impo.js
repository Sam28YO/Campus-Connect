import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "./components/header";
import Footer from "./components/footer";
import { useState } from "react";
const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

export default function ProductList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000,
    refetchInterval: 30000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center py-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <h1 className="mx-4 text-lg">Page {page}</h1>
        <button
          onClick={() =>
            setPage((prev) => (startIndex + itemsPerPage < data.length ? prev + 1 : prev))
          }
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
      <div>
        <h1 className="text-white text-3xl mx-96 px-96">Product List</h1>
        <ul className="py-4 pl-60 grid grid-cols-3 gap-4">
          {paginatedData.map((product) => (
            <div key={product.id} className="py-4 flex flex-row">
              <div className="rounded-b-lg shadow w-52 bg-green-600">
                <li>{product.title}</li>
                <li>${product.price}</li>
                <img
                  src={product.image}
                  className="h-48 w-48 object-cover object-center"
                  alt={product.title}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
  
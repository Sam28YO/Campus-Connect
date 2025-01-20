import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);  
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10"><p className="text-xl text-gray-500">Loading products...</p></div>;
  }

  if (error) {
    return <div className="text-center py-10"><p className="text-xl text-red-500">{error}</p></div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
              <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-semibold text-blue-600">${product.price}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

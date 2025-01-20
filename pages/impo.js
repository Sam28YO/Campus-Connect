import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Header from './components/header';
import Footer from './components/footer';
//iska use realtime data k liye hota hai
const fetchProducts = async () => {
  const  {data}  = await axios.get('https://fakestoreapi.com/products');
  return data;
};

export default function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'], 
    queryFn: fetchProducts, 
    staleTime: 60000, //kitna time data ko fresh mana jayega
    refetchInterval: 30000, //fkitne time baad fetch hoga
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Header/>
    <div>
      <h1>Product List</h1>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
    <Footer/>
    </div>
  );
}

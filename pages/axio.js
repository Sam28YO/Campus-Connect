import axios from 'axios';
import { useEffect, useState } from 'react';

async function fetchData(setData) {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setData(response.data);
}
export default function HomePage() {
  const [data, setData] = useState([]); 
  useEffect(() => {
    fetchData(setData);
  }, []);
  return (
  <div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-center mb-6">Axios Data</h1>
  <ul class="space-y-6">
  {data.map((item) => (<li key={item.id} class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
<h3 class="text-xl font-semibold text-gray-800 mb-4">{item.title}</h3>
<p class="text-gray-600">{item.body}</p>
</li>))}
  </ul>
</div>

  );
}

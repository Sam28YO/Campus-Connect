// pages/index.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

export default function HomePage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'], 
    queryFn: fetchPosts, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-center text-gray-900 mb-6">Posts</h1>
  <ul class="space-y-6">
    {data.map((post) => (
      <li key={post.id} class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h3>
        <p class="text-gray-600">{post.body}</p>
      </li>
    ))}
  </ul>
</div>

  );
}

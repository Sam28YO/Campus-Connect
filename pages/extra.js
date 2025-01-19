  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await res.json()
   
    // Pass data to the page via props
    return { props: { data } }
  }
  export default function extra({ data }) {
    return (
      <div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-center text-gray-800 mb-6">Posts</h1>
  <ul class="space-y-6">
    {data.map((post) => (
      <li key={post.id} class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h2>
        <p class="text-gray-700">{post.body}</p>
      </li>
    ))}
  </ul>
</div>

    );
  }
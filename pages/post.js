export async function getStaticProps() {
    const res = await fetch('https://api.vercel.app/blog');
    const post = await res.json();
  
    return {
      props: { post },
      revalidate: 60, 
    };
  }
  
  export default function Post({ post }) {
    return (
        <div className="container mx-auto  px-4 py-8">
        <ul className="space-y-4">
          {post.map((blog) => (
            <li key={blog.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
            </li>
          ))}
        </ul>
      </div>
      
    );
  }
  //export const dynamic='force-dynamic'
  
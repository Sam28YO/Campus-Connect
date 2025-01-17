import { loadPosts } from "../lib/loadposts";
import Header from "./components/Header"; // Assuming you have a Header component

// This function runs only on the server side
export async function getStaticProps() {
  // Fetch the data for posts
  const posts = await loadPosts();

  // Return props for the page component
  return {
    props: {
      posts,
    },
  };
}

// Default export: React component for the page
export default function Blog({ posts }) {
  return (
    <>
      <Header />
      <ul className="flex flex-col container gap-6 mx-auto px-4 py-8  ">
        
        {posts.map((post) => (
          <div key={post.id} className="bg-black bg-gradient-to-r from-pink-200 to-pink-400 rounded-lg shadow-lg text-green-900 p-4">
            <h2 className="text-lg font-bold">{post.id}</h2>
            <li className="text-xl">{post.title}</li>
            <p>{post.body}</p>
          </div>
        ))}
      </ul>
    </>
  );
}

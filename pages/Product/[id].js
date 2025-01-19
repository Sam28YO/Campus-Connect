import Header from "../components/header";

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: String(post.id) }, 
  }));

  return { paths, fallback: true }; 
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();
  return {props: {post, },};
}

export default function Post({ post }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
    <Header />
    <article className="w-full max-w-3xl p-4">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700">{post.body}</p>
    </article>
  </div>
  
  );
}

import Header from "../components/header"

export async function getStaticPaths() {
    const posts = await fetch('https://api.vercel.app/blog').then((res) =>
      res.json()
    )
    const paths = posts.map((post) => ({
      params: { id: String(post.id) },
    }))
   
    // We'll prerender only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
   
  export async function getStaticProps({ params }) {
    const post = await fetch(`https://api.vercel.app/blog/${params.id}`).then(
      (res) => res.json()
    )
   
    return {
      props: { post },
      // Next.js will invalidate the cache when a
      // request comes in, at most once every 60 seconds.
      revalidate: 60,
    }
  }
   
  export default function Page({ post }) {
    return (
      <main>
        <Header/>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </main>
    )
  }
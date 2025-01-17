import Header from "../components/header"

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://api.vercel.app/blog')
    const posts = await res.json()
    // Pass data to the page via props
    return {
        props: {
          posts,
        },
      };
  }
   
  export default function repo({ posts }) {
   return (
       <>
         <Header />
         <ul className="flex flex-col container gap-6 mx-auto px-4 py-8  ">
           
           {posts.map((post) => (
             <div key={post.id} className="bg-black bg-gradient-to-r from-orange-200 to-orange-400 rounded-lg shadow-lg text-green-900 p-4">
               <h2 className="text-lg font-bold">{post.id}</h2>
               <li className="text-xl">{post.title}</li>
               <p>{post.body}</p>
             </div>
           ))}
         </ul>
       </>
     );
  }
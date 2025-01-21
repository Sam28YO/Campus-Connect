export async function getServerSideProps(){
    const res= await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts= await res.json()

    return {props:{posts}};
}
export default function example({posts}){
return(
    <div>
        {Array.from(posts).map((post)=>{
            return <div key={post.id}>{post.title}</div>
        })}

    </div>
)
}
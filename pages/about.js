import Header from "./components/header";
import { useRouter } from 'next/router';
export default function About(){
    const router= useRouter();
    return (<>
    <Header/>
    <h1>About</h1>
    <button className="bg-blue-300  p-6 rounded shadow" onClick={()=>{router.push('/')}}>touch</button></>)
}
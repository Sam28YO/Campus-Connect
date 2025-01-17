import Header from "./components/header";
import { useRouter } from 'next/router';
export default function About(){
    const router= useRouter();
    return (<>
    <Header/>
    <h1>About</h1>
    <button className="bg-blue-300 h-10 w-32  rounded " onClick={()=>{router.push('/')}}>touch</button></>)
}
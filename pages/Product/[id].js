import { useRouter } from 'next/router';
import Header from '../components/header';
export default function Product(){
    const router = useRouter();
    const { id } = router.query; 
    return(<>
    <Header/>
    
    <h1>Product : {id}</h1>
    </>)
    
}
import Header from "./components/header";
import { atom1 } from "./atoms/atom1";
import { useRecoilState } from "recoil";
export default function Page() {
  const [count,setcount]=useRecoilState(atom1);
  return (<>

  <Header/>
  <button onClick={()=>{setcount(count-1)}}>-</button>
  <h1>{count}</h1>
  <button onClick={()=>{setcount(count-1)}}>+</button>
  </>
  )
}
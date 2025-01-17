import { atom1 } from "../atoms/atom1";
import { useRecoilState } from "recoil";

export default function Counter(){
    const [count, setCount] = useRecoilState(atom1);
return(
    <div className="flex items-center justify-center h-screen ">
  <div className="flex flex-row items-center justify-center h-32 w-64 p-4 gap-4 bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-lg">
    <button
      className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-100 transition duration-200"
      onClick={() => setCount(count - 1)}
    >
      -
    </button>
    <h1 className="text-2xl font-semibold text-white bg-green-800 px-6 py-2 rounded-lg shadow-inner">
      {count}
    </h1>
    <button
      className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-100 transition duration-200"
      onClick={() => setCount(count + 1)}
    >
      +
    </button>
  </div>
</div>


)
}
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { useState, useEffect } from 'react';

const { persistAtom } = recoilPersist();
const counterState = atom({
  key: 'count',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export default function Counter() {
  const [count, setCount] = useRecoilState(counterState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); 
  }, []);

  if (!isLoaded) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="flex flex-row items-center justify-center h-32 w-64 p-4 gap-4 bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-lg sm:w-72 md:w-80 lg:w-96">

<button className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-green-100 active:scale-95"
onClick={() => setCount(count - 1)}
    >-</button>
<h1 className="text-xl sm:text-2xl font-semibold text-white bg-green-800 px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-inner">
      {count}</h1>
<button className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-green-100 active:scale-95"
      onClick={() => setCount(count + 1)}
    >+</button>
  </div>
</div>

  );
}

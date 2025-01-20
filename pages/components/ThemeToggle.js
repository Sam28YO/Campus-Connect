import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../atoms/state';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, hydrated]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  if (!hydrated) {
    return null;
  }
  return (
    <div
      className={`flex justify-center items-center ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}>
      <div className="container flex flex-row gap-72 h-20 py-2 justify-center items-center">
        <div className="flex flex-row py-4 text-xl px-20 gap-6">
          <Link href="/post" className={`flex flex-row gap-4 hover:${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-500'
} transition duration-300`}>Witness our journey from Start to 2025<FaArrowRight className="my-1 animate-pulse" />
          </Link>
<button onClick={toggleTheme} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
 {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;

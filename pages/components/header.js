import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = '/';

  return (
<div className="fixed top-0 left-0 w-full bg-gray-800 text-white px-4 shadow-lg">
<div className="flex items-center justify-between h-16">
<button className="block md:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path strokeLinecap="round"  d="M4 6h16M4 12h16m-7 6h7" />
</svg></button>
<div className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full md:static md:flex md:w-auto md:items-center bg-gray-800 md:bg-transparent md:flex-row md:gap-4 flex-col`}>
<Link href="/" className={pathname === '/' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>Home</Link>
<Link href="/about" className={pathname === '/about' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>About</Link>
<Link href="/Product/1" className={pathname === '/Product/1' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>Producta</Link>
<Link href="/table" className={pathname === '/table' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>Table</Link>
 <Link href="/axio" className={pathname === '/axio' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>Axio</Link>
<Link href="/query" className={pathname === '/query' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>Query</Link>
<Link href="/post" className={pathname === '/post' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>ISR</Link>
<Link href="/list" className={pathname === '/list' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>Select</Link>
<Link href="/extra" className={pathname === '/extra' ? "bold-font text-green-300 px-4 py-2 md:py-0" : "text-blue-500 px-4 py-2 md:py-0"}>SSR</Link>
        </div>
      </div>
    </div>
  );
}

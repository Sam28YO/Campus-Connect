import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header(){
    const pathname=usePathname();
    return ( <>
    <div className="container text-white bg-gray-800 mx-auto px-4 flex justify-center items-center">
    <Link href='/'
    className={pathname==='/'?"bold-font text-green-300 ml-4 mr-4":"text-blue-500 ml-4 mr-4"} >Home</Link>|
    <Link  className={pathname==='/about'?"bold-font text-green-300 ml-4 mr-4":"text-blue-500 ml-4 mr-4"}  href='/about'>About</Link>
|<Link className={pathname==='/Product/a'?"bold-font text-green-300 ml-4 mr-4":"text-blue-500 ml-4 mr-4"} href='/Product/a'>Producta</Link>
|<Link className={pathname==='/blog'?"bold-font text-green-300 ml-4 mr-4":"text-blue-500 ml-4 mr-4"} href='/blog'>Blogs</Link>|
<Link className={pathname==='/repo'?"bold-font text-green-300 ml-4 mr-4":"text-blue-500 ml-4 mr-4"} href='/repo'>Repos</Link>
    </div></>)
}
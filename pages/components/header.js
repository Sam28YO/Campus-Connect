import Link from "next/link";

export default function Header(){
    return ( <>
    <div className="container mx-auto px-4 flex justify-center items-center">
    <Link href='/'>Home</Link>|<Link href='/about'>About</Link>|<Link href='/Product/a'>Producta</Link>
    </div></>)
}
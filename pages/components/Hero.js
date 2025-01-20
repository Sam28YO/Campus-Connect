import Image from "next/image";
import pic1 from "../../public/pic1.webp";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-8">
      <div className="flex items-center justify-between px-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">Welcome to KP!</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Streamline your customer relationships with MiniCRM. Organize contacts, track interactions, and manage tasks, all in one 
            modern, responsive, and user-friendly application. Powered by Next.js, Tailwind CSS,and React for a seamless experience.
          </p>
          <div className="flex space-x-4">
            <Link href="/impo" className="bg-white text-blue-600 px-6 py-3
          rounded-md font-semibold hover:bg-gray-200 "
            >About US
            </Link>
            <Link href="/started" className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 ">
              Start Free Trial
            </Link>
             </div>
              </div>

        <div className="flex-1 flex justify-center">
          <Image
            className="border-4 border-black rounded-lg shadow-lg"
            src={pic1}
            width={400}
            height={300}
            
          />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
export default function Footer() {
  return (
    <footer id="footer" className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mx-6 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Contact Information</h2>
            <p className="hover:underline"> Email: kanwarasisahuja@gmail.com</p>
            <p    className="hover:underline"> Phone:+12 345678900</p>
          </div>
          <div className=" justify-items-center md:mb-0 pr-28">
            <h2 className="text-lg font-bold mb-2">Address</h2>
            <p>123  Lane New York City, USA</p>
            <p>ZIP Code: 56789</p>
          </div>
          <div className="flex space-x-4 pr-16">
            <Link
              href="https://github.com/yourgithubprofile"
              className="hover:text-yellow-400 transition duration-300"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/yourlinkedinprofile" className="hover:text-yellow-400 transition duration-300">
              LinkedIn</Link>  
          </div>
        </div>
        <div className="mt-8 text-center text-sm ">
          <p>@2025 Kanwar Asis Singh Ahuja. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

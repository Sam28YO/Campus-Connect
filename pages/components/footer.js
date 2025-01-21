import Link from "next/link";
import { FaGithub, FaHome, FaLinkedin, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer"className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center text-center md:text-left md:items-start mx-6 mb-6 md:mb-0 w-full md:w-1/3">
            <FaPhone className="text-3xl mb-2" />
            <h2 className="text-lg font-bold mb-2">Contact Information</h2>
            <p className="hover:underline">Email: kanwarasisahuja@gmail.com</p>
            <p className="hover:underline">Phone: +12 345678900</p>
          </div>

          <div className="flex flex-col items-center text-center md:text-left md:items-start mb-6 md:mb-0 w-full md:w-1/3">
            <FaHome className="text-3xl mb-2" />
            <h2 className="text-lg font-bold mb-2">Address</h2>
            <p>123 Lane, New York City, USA</p>
            <p>ZIP Code: 56789</p>
          </div>

          <div className="flex flex-col items-center text-center w-full md:w-1/3">
            <div className="flex space-x-4 mb-4">
              <FaGithub className="text-2xl" />
              <Link href="https://github.com/yourgithubprofile" className="hover:text-yellow-400 transition duration-300">
                GitHub
              </Link>
            </div>
            <div className="flex space-x-4">
              <FaLinkedin className="text-2xl" />
              <Link href="https://linkedin.com/in/yourlinkedinprofile" className="hover:text-yellow-400 transition duration-300">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 Kanwar Asis Singh Ahuja. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

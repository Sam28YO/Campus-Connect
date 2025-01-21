import Select from "react-select";
import Link from "next/link";

const options = [
  { value: "What is KP?", label: "What is KP?" },
  { value: "HelpDesk", label: "HelpDesk" },
  { value: "Sales", label: "Sales" },
];

export default function Header() {
  const contact = () => {
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-yellow-100 flex flex-col md:flex-row items-center w-full h-auto md:h-16 shadow-lg px-4 py-4 md:py-0">

      <h1 className="text-2xl font-bold bg-yellow-900 text-white cursor-pointer px-4 py-2 rounded-lg mb-4 md:mb-0">
        KP
      </h1>
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <Select className="rounded-lg text-sm md:text-base" options={options} placeholder="Select an Option"/>
      </div>
      <nav className="flex flex-col md:flex-row text-black text-lg font-bold space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto">
        <Link  href="/about"className="hover:text-green-600 text-center cursor-pointer">PRICING</Link>
        <button onClick={contact} className="hover:text-green-600 text-center cursor-pointer">CONTACT US </button>
      </nav>
    </header>
  );
}

import Select from 'react-select';
import Link from 'next/link';
const options = [
    { value: 'What is KP?', label: 'What is KP?' },
    { value: 'HelpDesk', label: 'HelpDesk' },
    { value: 'Sales', label: 'Sales' },
];

export default function Header() {
    const contact = () => {
        document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="container bg-yellow-100  flex flex-row items-center h-16 shadow-lg">
            <h1 className="ml-4 text-xl bg-yellow-900 text-white cursor-pointer pl-4 pr-6 py-2 rounded-lg">KP</h1>
            <div className="w-1/3 mx-6">
                <Select className="rounded-lg" options={options} />
            </div>
            <div className="flex flex-row text-black text-lg font-bold space-x-8">
                <Link href='/about' className="hover:text-green-600  cursor-pointer">PRICING</Link>
                <button onClick={contact} className="hover:text-green-600  cursor-pointer">CONTACT US</button>
            </div>
        </div>
    );
}

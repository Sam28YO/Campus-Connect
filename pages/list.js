import Select from 'react-select';
import { FaBeer } from 'react-icons/fa';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function Mylist() {
  return (
    <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
  <Select className="w-full max-w-xs p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" options={options} />
  <FaBeer className="text-4xl text-yellow-500 ml-4" />
</div>

  );
}

export default Mylist;

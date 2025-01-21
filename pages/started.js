import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { userState } from '../src/atoms/userAtom';
import Header from './components/header';
import Footer from './components/footer';

export default function SignUpForm() {
  const [formData, setFormData] = useRecoilState(userState);
  const [responseMessage, setResponseMessage] = useState('');
  const [userList, setUserList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('userCredentialsList')) || [];
    setUserList(savedUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/hello', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const updatedUsers = [...userList, formData];
      localStorage.setItem('userCredentialsList', JSON.stringify(updatedUsers));
      setUserList(updatedUsers);

      setResponseMessage('Contact added successfully!');
    } catch (error) {
      setResponseMessage('Try again.');
    }
  };
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData(userList[index]);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditSave = () => {
    const updatedUsers = userList.map((user, index) =>
      index === editIndex ? editData : user
    );
    setUserList(updatedUsers);
    localStorage.setItem('userCredentialsList', JSON.stringify(updatedUsers));
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedUsers = userList.filter((_, i) => i !== index);
    setUserList(updatedUsers);
    localStorage.setItem('userCredentialsList', JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 min-[120px]:w-full max-[405px]:w-[90%]">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Create a  Contact</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Add Contacts
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h1 className="block text-sm font-medium text-gray-600 mb-1">Name</h1>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 px-4 py-2"
                placeholder="Name"
              />
            </div>
            <div>
              <h1 className="block text-sm font-medium text-gray-600 mb-1">Email</h1>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 px-4 py-2"
                placeholder="Email"
              />
            </div>
            <div>
              <h1 className="block text-sm font-medium text-gray-600 mb-1">contact</h1>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 px-4 py-2"
                placeholder="Enter contact"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Add Contacts
            </button>
          </form>
          {responseMessage && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {responseMessage}
            </p>
          )}
        </div>
      </div>

      <div className="bg-gray-100 py-8">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Registered Users</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {userList.map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-full sm:w-80 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-gray-200"
            >
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditInputChange}
                    className="block w-full border-gray-300 rounded-lg px-2 py-1 mb-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditInputChange}
                    className="block w-full border-gray-300 rounded-lg px-2 py-1 mb-2"
                  />
                  <input
                    type="tel"
                    name="contact"
                    value={editData.contact}
                    onChange={handleEditInputChange}
                    className="block w-full border-gray-300 rounded-lg px-2 py-1 mb-2"
                  />
                  <button
                    onClick={handleEditSave}
                    className="bg-green-500 text-white py-1 px-2 rounded-md mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="bg-gray-500 text-white py-1 px-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-gray-700">{user.name}</h3>
                  <p className="text-sm text-gray-600">Email: {user.email}</p>
                  <p className="text-sm text-gray-600">Contact: {user.contact}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEditClick(index)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {userList.length === 0 && (
            <p className="text-gray-500 text-center">No registered users yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
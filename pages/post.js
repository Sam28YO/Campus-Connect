import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { timeAtom } from "../src/atoms/timeAtom";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Appointment() {
  const [userList, setUserList] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [editUserIndex, setEditUserIndex] = useState(null);
  const [editAppointmentIndex, setEditAppointmentIndex] = useState(null);
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("userCredentialsList")) || [];
    setUserList(
      savedUsers.map((user) => ({
        ...user,
        appointments: user.appointments || [],
      }))
    );
  }, []);

  const saveUsersToStorage = (updatedUsers) => {
    setUserList(updatedUsers);
    localStorage.setItem("userCredentialsList", JSON.stringify(updatedUsers));
  };

  const handleAddTime = () => {
    if (!newTime.trim() || selectedUserIndex === null) {
      alert("Please select a user and enter a valid time.");
      return;
    }
    const updatedUsers = [...userList];
    updatedUsers[selectedUserIndex].appointments.push(newTime);
    saveUsersToStorage(updatedUsers);
    setNewTime("");
  };

  const handleEditTime = () => {
    if (!editTime.trim() || editUserIndex === null || editAppointmentIndex === null) {
      alert("Please enter a valid time.");
      return;
    }
    const updatedUsers = [...userList];
    updatedUsers[editUserIndex].appointments[editAppointmentIndex] = editTime;
    saveUsersToStorage(updatedUsers);
    setEditUserIndex(null);
    setEditAppointmentIndex(null);
    setEditTime("");
  };

  const handleDeleteTime = (userIndex, appointmentIndex) => {
    const updatedUsers = [...userList];
    updatedUsers[userIndex].appointments.splice(appointmentIndex, 1);
    saveUsersToStorage(updatedUsers);
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-8 ">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Registered Users</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {userList.map((user, index) => (
            <div key={index} className={`bg-white shadow-md rounded-lg p-4 w-full sm:w-80 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-gray-200 ${
                selectedUserIndex === index ? "border-blue-500" : ""}`}
              onClick={() => setSelectedUserIndex(index)}
            >
              <div>
                <p className="text-sm text-gray-600">Index: {index}</p>
                <h3 className="text-lg font-bold text-gray-700">{user.name}</h3>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Contact: {user.contact}</p>
              </div>
            </div>
          ))}
          
        </div>

        <div className="mt-8">
          <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">Manage Appointments</h2>
          <div className="flex justify-center gap-4 mb-4">
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Enter appointment time"
              className="border border-gray-300 rounded-lg px-4 py-2"/>
            <button onClick={handleAddTime} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Appointment</button>
          </div>

          {selectedUserIndex !== null && (
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Appointments with  {userList[selectedUserIndex].name}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {userList[selectedUserIndex]?.appointments.map((time, appointmentIndex) => (
                  <div key={appointmentIndex} className="bg-white shadow-md rounded-lg p-4 w-full sm:w-80 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-gray-200" >
                    {editUserIndex === selectedUserIndex && editAppointmentIndex === appointmentIndex ? (
                      <div>
                        <input
                          type="text"
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                          className="block w-full border-gray-300 rounded-lg px-2 py-1 mb-2"/>
                        <button
                          onClick={handleEditTime}
                          className="bg-green-500 text-white py-1 px-2 rounded-md mr-2">Save
                        </button>
                        <button
                          onClick={() => {
                            setEditUserIndex(null);
                            setEditAppointmentIndex(null);
                            setEditTime("");
                          }}
                          className="bg-gray-500 text-white py-1 px-2 rounded-md">Cancel</button>
                      </div>) : (
                      <div>
                        <p className="text-sm text-gray-600">Appointment: {time}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              setEditUserIndex(selectedUserIndex);
                              setEditAppointmentIndex(appointmentIndex);
                              setEditTime(time);
                            }}
                            className="bg-blue-500 text-white py-1 px-2 rounded-md">Edit
                          </button>
                          <button onClick={() => handleDeleteTime(selectedUserIndex, appointmentIndex)}
                            className="bg-red-500 text-white py-1 px-2 rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {userList[selectedUserIndex].appointments.length === 0 && (
                  <p className="text-gray-500 text-center">No appointments added yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

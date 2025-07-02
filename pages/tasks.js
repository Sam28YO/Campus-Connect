import { taskAtom } from "@/src/atoms/taskAtom";
import axios from "axios";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
export default function task(){
   const [formData,setFormData]=useRecoilState(taskAtom);
  const  [responseData,setResponseData]=useState("");
   const  [taskList,setTaskList]=useState([])
   const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({}); 
useEffect(()=>{
    const savedTasks=JSON.parse(localStorage.getItem('userTaskList'))||[]
    setTaskList(savedTasks);        
},[])
const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const  handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/api/hi',formData,{
            headers:{
                'Content-Type': 'application/json', 
            },
        });
        const updatedTasks = [...taskList, formData];
        localStorage.setItem('userTaskList',JSON.stringify(updatedTasks))
        setTaskList(updatedTasks);
        setResponseData('Task Added Suucessfully')
    } catch (error) {
        setResponseData('try again')
    }
  }
  const handleEditClick=(index)=>{
    setEditIndex(index)
    setEditData(taskList[editIndex])
  }
  const handleEditInputChange=(e)=>{
    const {name,value}=e.target;
    setEditData((prev)=({
        ...prev,[name]:value,
    }))
  }
  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
  <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"onSubmit={handleSubmit}>
    <h2 className="text-2xl font-bold text-white text-center mb-6">Add a Task</h2>
    <div className="mb-4">
      <label className="block text-white mb-2" >
        Enter your Task:
      </label>
      <input type="text" name='task' className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500" value={formData.task} onChange={handleChange} />
    </div>
    <div className="mb-4">
      <label className="block text-white mb-2" htmlFor="date">
        Enter your Date:
      </label>
      <input
        type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"/>
    </div>
    <div className="mb-4">
      <label className="block text-white mb-2" htmlFor="time">
        Enter your Time:
      </label>
      <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"/>
    </div>
    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300">
      Submit
    </button>
  </form>
  
  {responseData && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {responseData}
            </p>
          )}
          <div className="flex flex-col items-start space-y-4">
  {taskList.map((task, index) => (
    <div key={index} className="bg-gray-800 p-4 rounded shadow">
      <p className="text-white text-lg font-bold mb-2">Task: {task.task}</p>
      <p className="text-white text-lg mb-2">Date: {task.date}</p>
      <p className="text-white text-lg mb-2">Time: {task.time}</p>
      <button className="bg-green-500 text-white py-1 px-2 rounded-md mr-2">
Save </button>
      <button className="bg-gray-500 text-white py-1 px-2 rounded-md">Cancel
       </button>
                </div>
    
  ))}
  {taskList.length === 0 && (
            <p className="text-gray-500 text-center">No events created.</p>
          )}
</div>

           
            
          
          
</div>


  )

}
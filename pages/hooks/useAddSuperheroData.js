
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const addSuperHero = async (hero) => {
  const response = await axios.post("http://localhost:3000/impo1", hero); // URL should be correct
  return response.data; 
};


export const useAddSuperheroData = () => {
  return useMutation(addSuperHero);  
};

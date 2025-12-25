
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://assignment11-eight-swart.vercel.app/"
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
      

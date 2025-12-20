//import { ScaleLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      className="flex flex-row justify-center items-center min-h-screen">
      <span class="loading loading-bars loading-lg text-red-800 mr-4"></span>
      <span class="loading loading-bars loading-lg text-green-800 mr-4"></span>
      <span class="loading loading-bars loading-lg text-red-800 mr-4"></span>
      <span class="loading loading-bars loading-lg text-green-800 mr-4"></span>
      <span class="loading loading-bars text-red-800 mr-4"></span>
    </div>
  );
};

export default LoadingSpinner;

import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import toast from "react-hot-toast";


const Register = () => {
  const { signInWithGoogle, createUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("user");

 const handleRegister = async (e) => {
   e.preventDefault();
   try {
     await createUser(email, password, name, role);
     navigate("/"); 
   } catch (err) {
     console.error(err);
     alert(err.message || "Registration failed");
   }
  };
  
   const handleGoogleSignIn = () => {
     toast.loading("Creating user...", { id: "create-user" });
     signInWithGoogle()
       .then((result) => {
         toast.success("User created successfully!", { id: "create-user" });
         console.log(result.user);
         navigate("/");
       })
       .catch((error) => {
         console.log(error);
         toast.error(error.message, { id: "create-user" });
       });
   };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto p-6 bg-green-100 flex flex-col justify-center items-center my-10 p-6 rounded-3xl"
    >
      <title>Sign Up</title>
      <h2 className="text-3xl text-green-800 font-bold mb-4">Sign Up</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="border-2 border-green-800 rounded-xl p-2 w-full m-3"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="border-2 border-green-800 rounded-xl p-2 w-full m-3"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border-2 border-green-800 rounded-xl p-2 w-full m-3"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <select
        className="border-2 border-green-800 rounded-xl p-2 w-full m-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-green-800 rounded-2xl text-white w-1/2 my-3 py-2 font-semibold hover:text-red-800 hover:border-red-800 border-2 border-green-800 hover:bg-white"
      >
        Register
      </button>

      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white rounded-2xl text-black border-2 py-2 px-8 mb-4 border-green-800"
      >
        <FcGoogle />
        Login with Google
      </button>
      <p className="text-center italic">
        Already have an account? Please{" "}
        <Link
          className="text-red-800 hover:text-green-800 font-bold"
          to="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;

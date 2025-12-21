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
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="border p-2 w-full mb-3"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <select
        className="border p-2 w-full mb-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister} className="bg-green-600 text-white w-full py-2">Register</button>

       <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-2xl text-black border-2 border-green-600"
        >
          <FcGoogle />
          Login with Google
        </button>
        <p className="text-center">
          Already have an account? Please{" "}
          <Link className="text-blue-500 hover:text-red-600" to="/login">
            Login
        </Link>
        </p>


    </form>
  );
};

export default Register;

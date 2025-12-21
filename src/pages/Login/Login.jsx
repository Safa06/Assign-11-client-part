import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      await signIn(email, password); 
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <form id="form" onSubmit={handleLogin} className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white w-full py-2">
        Login
      </button>
    </form>
  );
};

export default Login;

// <form onSubmit={handleLogin} className="max-w-md mx-auto p-6">
//   <h2 className="text-xl font-bold mb-4">Login</h2>

//   <input
//     type="email"
//     placeholder="Email"
//     className="border p-2 w-full mb-3"
//     onChange={(e) => setEmail(e.target.value)}
//     required
//   />

//   <input
//     type="password"
//     placeholder="Password"
//     className="border p-2 w-full mb-3"
//     onChange={(e) => setPassword(e.target.value)}
//     required
//   />

//   <select
//     className="border p-2 w-full mb-3"
//     value={role}
//     onChange={(e) => setRole(e.target.value)}
//   >
//     <option value="user">User</option>
//     <option value="manager">Manager</option>
//     <option value="admin">Admin</option>
//   </select>

//   <button className="bg-blue-600 text-white w-full py-2">Login</button>
// </form>

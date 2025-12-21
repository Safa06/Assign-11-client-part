import { useState } from "react";
import { useNavigate, Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Firebase login
      const userCredential = await signIn(email, password);
      const user = userCredential.user;

      // Verify role from backend
      const res = await axios.get(
        `http://localhost:5000/users?email=${user.email}`
      );
      const backendUser = res.data[0];

      if (!backendUser || backendUser.role !== role) {
        setError("Role mismatch or user not found");
        return;
      }

      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  // const handleLogin = async (email, password) => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const firebaseUser = userCredential.user;

  //     const { data } = await axios.get(
  //       `http://localhost:5000/users?email=${firebaseUser.email}`
  //     );
  //     login(data); // sets user with role
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  
  
  
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Create user in backend if not exists
      const res = await axios.get(
        `http://localhost:5000/users?email=${user.email}`
      );
      if (res.data.length === 0) {
        await axios.post("http://localhost:5000/users", {
          name: user.displayName,
          email: user.email,
          role,
        });
      } else if (res.data[0].role !== role) {
        setError("Role mismatch");
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google Sign-In failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="input w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="select w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-primary w-full" type="submit">
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mt-3"
      >
        Sign in with Google
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 text-center">
        No account?{" "}
        <Link to="/signup" className="text-blue-500 underline">
          SignUp
        </Link>
      </p>
     
    </div>
  );
};

export default Login;

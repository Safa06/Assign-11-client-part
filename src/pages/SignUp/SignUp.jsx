import { useState } from "react";
import { useNavigate, Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      console.log(user);
      await updateUserProfile(name);

      // Save in backend
      await axios.post("http://localhost:5000/users", { name, email, role });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const res = await axios.get(
        `http://localhost:5000/users?email=${user.email}`
      );
      if (res.data.length === 0) {
        await axios.post("http://localhost:5000/users", {
          name: user.displayName,
          email: user.email,
          role,
        });
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google Sign-In failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="input w-full"
          onChange={(e) => setName(e.target.value)}
        />
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
          Register
        </button>
      </form>

      <button
        onClick={handleGoogleRegister}
        className="btn btn-outline w-full mt-3"
      >
        Sign up with Google
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;

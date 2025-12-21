import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth(); 
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

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <form
      id="form"
      onSubmit={handleLogin}
      className="max-w-md bg-green-100 my-10 flex flex-col justify-center items-center rounded-3xl mx-auto p-6"
    >
      <h2 className="text-3xl font-bold mb-4 text-green-800 rounded">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="border-2 border-green-800 rounded-xl p-2 w-full m-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border-2 border-green-800 rounded-xl p-2 w-full m-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-green-800 rounded-2xl text-white w-1/2 my-3 py-2 font-semibold hover:text-red-800 hover:border-red-800 border-2 border-green-800 hover:bg-white"
      >
        Login
      </button>

      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white rounded-2xl text-black border-2 py-2 px-8 mb-4 border-green-800"
      >
        <FcGoogle />
        Login with Google
      </button>

      <p className="text-center italic">
        Newbie? Please{" "}
        <Link className="text-red-800 hover:text-green-800 font-bold" to="/signup">
          SignUp
        </Link>
      </p>
    </form>
  );
};

export default Login;

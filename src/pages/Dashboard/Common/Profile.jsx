
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user, logOut,role } = useAuth();

  if (!user) return <p><LoadingSpinner></LoadingSpinner></p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
       
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {role}</p>
        {user.status && <p><strong>Status:</strong> {user.status}</p>}

        <button
          onClick={logOut}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

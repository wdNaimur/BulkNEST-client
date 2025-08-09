import React, { use, useState, useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import useRole from "../../hooks/useRole";

const ProfileDetails = () => {
  const { user, updateUser } = use(AuthContext);
  const [reload, setReload] = useState(false);
  const [role] = useRole();
  useEffect(() => {}, [reload]);
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const url = form.url.value;

    updateUser({
      displayName: name,
      photoURL: url,
    })
      .then(() => {
        toast.success("Profile updated successfully");
        document.getElementById("my_modal_5").close();
        setReload((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="card w-full shadow-lg shadow-primary/10  container px-4 mx-auto bg-base-200 relative font-outfit">
      <figure className="px-8 pt-8">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="rounded-full w-32 h-32 object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <div className="relative w-35 -mt-15">
          <img
            className="w-35"
            src="https://i.ibb.co.com/x8SLPRkJ/banner-icon.png"
            alt="role background"
          />
          <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg uppercase">
            {role}
          </p>
        </div>
        <h2 className="card-title">{user.displayName}</h2>
        <h2 className="text-sm font-medium">{user.email}</h2>
        <p className="absolute badge badge-primary pb-1 text-base-100 top-4 left-5">
          {user.emailVerified ? "verified" : "not verified"}
        </p>
      </div>
      <button
        className="btn bg-primary/90 hover:bg-primary text-base-100 w-fit absolute top-3 right-5"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        <span className="flex gap-2 items-center">
          <FaPen /> Edit profile
        </span>
      </button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>
          <form onSubmit={handleUpdateProfile}>
            <legend className="fieldset-legend">Your Name</legend>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full mb-4"
              placeholder="Update Name"
              defaultValue={user.displayName}
              required
            />
            <legend className="fieldset-legend">Your PhotoURL</legend>
            <input
              type="url"
              name="url"
              className="input input-bordered w-full mb-4"
              placeholder="Update Photo URL"
              defaultValue={user.photoURL}
              required
            />
            <div className="modal-action justify-end">
              <button
                type="button"
                className="btn bg-red-800 hover:bg-red-700 text-base-100"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-secondary">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileDetails;

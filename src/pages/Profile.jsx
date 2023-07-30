import { useState, useEffect } from "react";

import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../firebase.config";

function Profile() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    auth.signOut();
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (currentUser.displayName !== name) {
        await updateProfile(currentUser, {
          displayName: name,
        });

        // update in firestore
        const userRef = doc(db, "users", currentUser.uid);

        await updateDoc(userRef, { name });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={handleLogoutClick}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Presonal Deatails</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && handleSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={email}
              onChange={handleChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;

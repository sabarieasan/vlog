import { useEffect, useState } from "react";
import { useBlogContext } from "../context/blogContext";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const { data, userProfile, setData } = useBlogContext();
  const navigate = useNavigate();

  console.log(userProfile);

  useEffect(() => {
    userProfile();
  }, []);

  const [user, setUser] = useState(data);

  const clickHandler = async () => {
    try {
      const snap = await getDoc(doc(db, "users", user.id));

      if (snap.exists()) {
        await updateDoc(doc(db, "users", user.id), { ...user });
      } else {
        console.log("No such document");
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/");
    toast.success("Profile Update Successfully !");
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [key]: value });
  };

  const uploadImage = async (e) => {
    const imageFile = e.target.files[0];

    try {
      const storageRef = await ref(
        storage,
        `user/${Date.now()}-${imageFile.name}`
      );
      const uploadTask = await uploadBytesResumable(storageRef, imageFile);

      getDownloadURL(storageRef).then((downloadUrl) => {
        setUser({ ...user, image: downloadUrl });
        toast.success("Image Uploaded Successfully!");
      });
    } catch (err) {
      console.log(`Error Occured while uploading profile image`, err.message);
    }
  };

  return (
    <div className="main-profile-container">
      <div className="main-profile">
        <div>
          <div className="main-profile-top-container">
            <h1>Personal Info</h1>
            <div className="main-profile-img-container">
              <img src={user?.image} alt={user?.firstName} />

              <label htmlFor="image" className="main-edit-img-btn">
                upload photo
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="main-upload-img"
                  id="image"
                  onChange={uploadImage}
                />
              </label>
            </div>
          </div>

          <div className="main-personal-info">
            <h2>PERSONAL INFO*</h2>
            <p>Provide your Personal Info</p>
            <div className="main-personal-info-container">
              <div className="main-name-container">
                <div className="main-name">
                  <label htmlFor="firstName">Firstname*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={user?.firstName}
                    onChange={changeHandler}
                  />
                </div>

                <div className="main-name">
                  <label htmlFor="lastName">Last name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user?.lastName}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className="main-name-container">
                <div className="main-name">
                  <label htmlFor="gender">Gander*</label>
                  <select
                    id="gender"
                    name="gender"
                    value={user?.gender}
                    onChange={changeHandler}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="main-name">
                  <label htmlFor="age">Age*</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={user?.age}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="main-contact-info-container">
            <h2>CONTACT INFO*</h2>
            <p>Provide your Contact Information</p>
            <div className="main-personal-info-container">
              <div className="main-name-container">
                <div className="main-name">
                  <label htmlFor="email">Email ID*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email}
                    onChange={changeHandler}
                  />
                </div>

                <div className="main-name">
                  <label htmlFor="phoneNo">Phone No*</label>
                  <input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={user?.phoneNo}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
          </div>

          <button className="main-profile-update-btn" onClick={clickHandler}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

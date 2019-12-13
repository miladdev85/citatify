import React, { useState } from "react";
import { auth, getUserReference, storage } from "../Utils/firebase";
import SubmitError from "./Shared/SubmitError";
import LoadingSpinner from "./Shared/LoadingSpinner";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const getUid = () => {
    return auth.currentUser.uid;
  };

  // Handle image chosing. Using the web api FileReader
  const handleFileChange = event => {
    const file = event.target.files[0];

    const imageReader = new FileReader();

    // When file read has completed
    imageReader.onloadend = () => {
      setImageUrl(imageReader.result);
      setImage(file);
    };

    // Checking so that file is present and to prevent crashing in case there is no picture (which would happen if we press cancel on file select)
    // readAsDataURL is used to read the contents of the specified file
    if (file) {
      imageReader.readAsDataURL(file);
    }
  };

  const handleChange = event => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Use helper function to get reference to the user.
    const userRef = await getUserReference(getUid());

    // Update display name and set states
    if (displayName) {
      try {
        setLoading(true);
        await userRef.update({ displayName });
        setLoading(false);
        setDisplayName("");
      } catch (error) {
        setError(error);
      }
    }

    // Add image and set states. Using storage functions from Firebase
    // Create  /user-profiles/uid folder in firestore and upload the image
    // getDownloadURL method returns a promise with url to the uploaded image which we update the user profile with and set the photoURL value to
    // This will ensure that the user will get the same image on next sign in

    if (image) {
      setLoading(true);
      storage
        .ref()
        .child("user-profiles")
        .child(getUid())
        .child(image.name)
        .put(image)
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => userRef.update({ photoURL }))
        .then(() => {
          setLoading(false);
          setImage("");
          setImageUrl("");
        })
        .catch(error => setError(error));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="md-form mt-0">
          <input
            type="text"
            name="displayName"
            className="form-control"
            placeholder="Display Name"
            onChange={handleChange}
            value={displayName}
          />
        </div>

        {imageUrl && (
          <div className="row">
            <div className="col-3 col-md-2 my-4">
              <img src={imageUrl} alt="profile" className="img-fluid img-thumbnail" />
              <p className="text-muted">{image.name}</p>
            </div>
          </div>
        )}

        {error && <SubmitError message={error} />}

        <label className="btn btn-mdb-color ml-0 px-3 py-2">
          Choose Image
          <input className="d-none" onChange={handleFileChange} type="file" />
        </label>

        <button
          className="btn btn-success px-3 py-2"
          disabled={(!displayName && !image) || loading}
          type="submit"
        >
          {loading && <LoadingSpinner className="mr-2" />}
          {loading ? "Loading" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

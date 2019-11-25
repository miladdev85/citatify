import React, { useState } from "react";
import { auth, getUserReference, storage } from "./Utils/firebase";
import SubmitError from "./SubmitError";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const getUid = () => {
    return auth.currentUser.uid;
  };

  const handleFileChange = event => {
    const file = event.target.files[0];

    const imageReader = new FileReader();

    imageReader.onloadend = () => {
      setImageUrl(imageReader.result);
      setImage(file);
    };

    // Checking so that file is present and to prevent crashing in case there is no picture (if we press cancel on file select)

    if (file) {
      imageReader.readAsDataURL(file);
    }
  };

  const handleChange = event => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Use helper function to get reference to the user. After we get the ref, update the user
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

    // Add image and set states. Using storage functions from firebase
    // Create  /user-profiles/uid folder in firestore and upload the image
    // getDownloadURL returns a promise with url to the uploaded image which we update the user profile with

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
          {loading && (
            <span
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {loading ? "Loading" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

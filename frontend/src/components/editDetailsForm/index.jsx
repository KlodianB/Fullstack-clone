import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getModalDisplay, setModalDisplay } from "../../store/ui";
import { updateUser } from "../../store/users";
import './editDetails.css'
import { useSelector } from "react-redux";

const EditDetailsForm = ({userdata, onSave}) => {

    const user = userdata
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(userdata.bio || "");
    const [workplace, setWorkplace] = useState(user.workplace || "");
    const [education, setEducation] = useState(user.education || "");
    const [residence, setResidence] = useState(user.residence || "");
    const [errors, setErrors] = useState([]);
    const modalDisplay = useSelector(getModalDisplay);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(updateUser(user.id, { ...user, firstName, lastName, bio, workplace, education, residence  }))
            .then(() => {
                dispatch(setModalDisplay(!modalDisplay)) 
            })
    };
    

    const onClose = () => {
        dispatch(setModalDisplay())
    }
      
      return (
        <>
        <form onSubmit={handleSubmit} className="edit-form" id="editForm">
        <div className="edit-form-header">
            <h1 className="edit-header">Edit details</h1>
            <div className="close-edit-form"><button onClick={onClose} className="close-edit-form-button"><i className="fa-regular fa-circle-xmark fa-lg"></i></button></div>
        </div>
        <div className="firstName-edit">
            <label className="edit-label" htmlFor="firstNameEdit">First name</label>
            <input
              type="text"
              id="firstNameEdit"
              placeholder={firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="edit-input"
            />
        </div>
        <div className="lastName-edit">
            <label className="edit-label" htmlFor="lastNameEdit">Last name</label>
            <input
              type="text"
              id="lastNameEdit"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
              className="edit-input"
            />
        </div>
        <div className="bio-edit">
          <label className="edit-label" htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            placeholder="Tell us about yourself..."
            onChange={(e) => setBio(e.target.value)}
            required
            className="edit-textarea"
          />
        </div>
        <div className="workplace-edit">
          <label className="edit-label" htmlFor="workplace">Workplace</label>
          <input
            type="text"
            id="workplace"
            value={workplace}
            placeholder="Where do you work?"
            onChange={(e) => setWorkplace(e.target.value)}
            required
            className="edit-input"
          />
        </div>
        <div className="education-edit">
          <label className="edit-label" htmlFor="education">Education</label>
          <input
            type="text"
            id="education"
            value={education}
            placeholder="Your educational background?"
            onChange={(e) => setEducation(e.target.value)}
            required
            className="edit-input"
          />
        </div>
        <div className="residence-edit">
            <label className="edit-label" htmlFor="residence">Residence</label>
            <input
            type="text"
            id="residence"
            value={residence}
            placeholder="Where do you live?"
            onChange={(e) => setResidence(e.target.value)}
            required
          className="edit-input"
        />
        </div>
        <button type="submit" className="edit-btn" id="editBtn">Save</button>
    </form>
    </>
      );
}

export default EditDetailsForm
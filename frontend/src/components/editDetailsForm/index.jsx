import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalDisplay } from "../../store/ui";
import { updateUser } from "../../store/users";

const EditDetailsForm = ({userdata}) => {

    const user = userdata
    const dispatch = useDispatch();
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [gender, setGender] = useState(user.gender);
    const [birthday, setBirthday] = useState(user.birthday)
    const [customGenderPronoun, setCustomGenderPronoun] = useState(false)
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (customGenderPronoun) {
            setGender(customGenderPronoun)
        }
        setErrors([]);
        dispatch(updateUser(user.id, { firstName, lastName, email, gender, birthday }))
            .then(() => {
                dispatch(setModalDisplay()) // Close the modal after a successful update
            })
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };
    

    const onClose = () => {
        dispatch(setModalDisplay())
    }
      
      return (
        <>
        <form onSubmit={handleSubmit} className="signup-form" id="signupForm">
        <div className="signup-form-header">
            <h1 className="signup-header">Edit details</h1>
            <div className="close-signup-form"><button onClick={onClose}className="close-signup-form">x</button></div>
        </div>
        <div className="sub-header-container">
        <h2 className="sub-header">It's quick and easy.</h2>
        </div>
        <ul className="error-list">
            {errors.map((error, index) => <li key={index} className="error-item">{error}</li>)}
        </ul>
        <div className="name-container">
        <label className="form-label" htmlFor="firstName">
            <input
              type="text"
              id="firstName"
              placeholder={firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="form-input"
            />
        </label>
        <label className="form-label" htmlFor="lastName">
            <input
              type="text"
              id="lastName"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
              className="form-input"
            />
        </label>
        </div>
        <label className="form-label" htmlFor="email">
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
        </label>
        <label className="form-label gender-label">
        <span className="gender-label">Gender</span>
            <div className="gender-container">
                <div className="gender-option-buttons">
                <label className="gender-option">Female
                    <input 
                        type="radio" 
                        className="radio"
                        id="femaleGender"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={(e) => {
                            setGender(e.target.value)
                            setCustomGenderPronoun(false)
                        }}
                    />
                </label>
                <label className="gender-option">Male
                    <input 
                        type="radio"
                        className="radio"
                        id="maleGender"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={(e) => {
                            setGender(e.target.value);
                            setCustomGenderPronoun(false)
                        }}
                    />
                </label>
                <label className="gender-option">Custom
                    <input 
                        type="radio" 
                        className="radio"
                        id="customGender"
                        name="gender"
                        value="Custom"
                        checked={gender === "Custom"}
                        onChange={(e) => {
                            setGender("Custom"); 
                            setCustomGenderPronoun(true);
                        }}
                    />
                </label>
                </div>
                {customGenderPronoun ? 
                    <div className="custom-option">
                    <select 
                    id="customPronoun"
                    defaultValue="Select your pronoun"
                    onChange={(e) => {
                        setCustomGenderPronoun(e.target.value);
                        if (e.target.value) {
                            setGender("Custom");
                        }
                    }}
                    required
                    className="gender-select"
                    >
                        <option key="disabled" disabled={true}>Select your pronoun</option>
                        <option value="She">She: "Wish her a happy birthday!"</option>
                        <option value="He">He: "Wish him a happy birthday!"</option>
                        <option value="They">They: "Wish them a happy birthday!"</option>
                    </select>
                        <p id="disclaimer">Your pronoun is visible to everyone.</p>
                        <input
                            type="text"
                            id="customGenderPronoun"
                            placeholder="Gender (optional)"
                            onChange={(e) => {
                                setCustomGenderPronoun(e.target.value);
                                if (e.target.value) {
                                    setGender("Custom");
                                }
                            }}
                            required
                            className="form-input"
                        />
                    </div>
                : null}
            </div>
        </label>
        <button type="submit" className="signup-btn" id="submitBtn">Edit details</button>
    </form>
    </>
      );
}

export default EditDetailsForm
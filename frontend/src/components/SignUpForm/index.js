import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './style.css'

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [month, setMonth] = useState(1)
    const [day, setDay] = useState(1)
    const [year, setYear] = useState(1)
    const [gender, setGender] = useState("");
    const [customGenderPronoun, setCustomGenderPronoun] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const currentYear = new Date().getFullYear();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // let date = new Date(`${year} ${month}, ${day}`)
            // setBirthday(date)
          setErrors([]);
          return dispatch(sessionActions.signup({ firstName, lastName, email, password, birthday, gender }))
            .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
      };

      const renderMonthOptions = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
        ));
    };

    const renderDayOptions = () => {
        let maxDay = 31;
        if (month === "February") {
            maxDay = 28;
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) { // Leap year
                maxDay = 29;
            }
        } else if (["April", "June", "September", "November"].includes(month)) {
            maxDay = 30;
        }

        const days = [];
        for (let i = 1; i <= maxDay; i++) {
            days.push(<option key={i} value={i}>{i}</option>);
        }
        return days;
    };

    const renderYearOptions = () => {
        const years = [];
        for (let i = currentYear; i >= currentYear - 100; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    };

      
      return (
        <form onSubmit={handleSubmit} className="signup-form" id="signupForm">
        <ul className="error-list">
            {errors.map((error, index) => <li key={index} className="error-item">{error}</li>)}
        </ul>
        <div className="name-container">
        <label className="form-label" htmlFor="firstName">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
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
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />

        {/* <label className="form-label" htmlFor="confirmPassword"></label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            /> */}
        <div className="birthday-container">
    <span className="birthday-label">Birthday</span>
    <div className="date-dropdowns">
        <select name="month" id="birthMonth" value={month} onChange={(e) => setMonth(e.target.value)} required className="birthday-select">
            {renderMonthOptions()}
        </select>
        <select name="day" id="birthDay" value={day} onChange={(e) => setDay(e.target.value)} required className="birthday-select">
            {renderDayOptions()}
        </select>
        <select name="year" id="birthYear" value={year} onChange={(e) => setYear(e.target.value)} required className="birthday-select">
            {renderYearOptions()}
            </select>
        </div>
    </div>
        <label className="form-label gender-label">
            Gender
            <div className="gender-container">
                <div className="gender-option-buttons">
                <label className="gender-option">
                    <input 
                        type="radio" 
                        id="femaleGender"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                    <span></span>
                </label>
                <label className="gender-option">
                    <input 
                        type="radio"
                        id="maleGender"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                    <span></span>
                </label>
                <label className="gender-option">
                    <input 
                        type="radio" 
                        id="customGender"
                        name="gender"
                        value="Custom"
                        checked={gender === "Custom"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Custom
                </label>
                </div>
                {gender === "Custom" && (
                    <div className="custom-option">
                    <select 
                    id="customPronoun"
                    value={customGenderPronoun}
                    onChange={(e) => setCustomGenderPronoun(e.target.value)}
                    required
                    className="gender-select"
                    >
                        <option value="" disabled>Select your pronoun</option>
                        <option value="He">He</option>
                        <option value="She">She</option>
                        <option value="They">They</option>
                    </select>
                        <p id="disclaimer">Your pronoun is visible to everyone.</p>
                        <input
                            type="text"
                            id="customGenderPronoun"
                            value={customGenderPronoun}
                            placeholder="Gender (optional)"
                            onChange={(e) => setCustomGenderPronoun(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                )}
            </div>
        </label>
        <button type="submit" className="signup-btn" id="submitBtn">Sign Up</button>
    </form>
      );
}

export default SignUpForm
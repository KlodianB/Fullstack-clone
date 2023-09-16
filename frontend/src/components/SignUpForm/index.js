import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

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
          setErrors([]);
          return dispatch(sessionActions.signup({ email, password }))
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
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
                Birthday
                <select name="month" value={month} onChange={(e) => setMonth(e.target.value)} required>
                    {renderMonthOptions()}
                </select>
                <select name="day" value={day} onChange={(e) => setDay(e.target.value)} required>
                    {renderDayOptions()}
                </select>
                <select name="year" value={year} onChange={(e) => setYear(e.target.value)} required>
                    {renderYearOptions()}
                </select>
            </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <label>
    Gender
    <div>
        <label>
            <input 
                type="radio" 
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
            />
            Male
        </label>
        <label>
            <input 
                type="radio" 
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
            />
            Female
        </label>
        <label>
            <input 
                type="radio" 
                name="gender"
                value="Custom"
                checked={gender === "Custom"}
                onChange={(e) => setGender(e.target.value)}
            />
            Custom
        </label>
        {gender === "Custom" && (
            <select 
                value={customGenderPronoun}
                onChange={(e) => setCustomGenderPronoun(e.target.value)}
                required
            >
                <option value="" disabled>Select your pronoun</option>
                <option value="He">He</option>
                <option value="She">She</option>
                <option value="They">They</option>
            </select>
        )}
    </div>
</label>
          <button type="submit">Sign Up</button>
        </form>
      );
}

export default SignUpForm
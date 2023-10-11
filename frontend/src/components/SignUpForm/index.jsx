import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './styles.css'
import { getModalDisplay, setModalDisplay } from "../../store/ui";
import { useSelector } from "react-redux";


const SignUpForm = () => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [month, setMonth] = useState(months[new Date().getMonth()])
    const [day, setDay] = useState(new Date().getDate())
    const [year, setYear] = useState(new Date().getFullYear())
    const [gender, setGender] = useState("");
    const [customGenderPronoun, setCustomGenderPronoun] = useState(false)
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [profilePicture, setProfilePicture] = useState("https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg");
    const [coverPhoto, setCoverPhoto] = useState("https://images.unsplash.com/photo-1600577916048-804c9191e36c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VsY29tZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80");
    const modalDisplay = useSelector(getModalDisplay);

    const currentYear = new Date().getFullYear();
    const monthIndex = months.indexOf(month);
    // const zeroPaddedMonth = monthIndex < 10 ? ('0' + monthIndex.toString()).slice(-2) : monthIndex.toString;

    const handleSubmit = (e) => {
        console.log(year, monthIndex, day);
        e.preventDefault();
            if (customGenderPronoun) {
                setGender(customGenderPronoun)
            }
            setBirthday(new Date(year, monthIndex, day).toJSON());
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, password, birthday, gender, profilePicture, coverPhoto })).then(() => {
                dispatch(setModalDisplay(!modalDisplay)) 
            })
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
      };

      const renderMonthOptions = () => {
        return months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
        ));
    };

    const renderDayOptions = () => {
        let maxDay = 31;
        if (month === "Feb") {
            maxDay = 28;
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) { // Leap year
                maxDay = 29;
            }
        } else if (["Apr", "Jun", "Sep", "Nov"].includes(month)) {
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

    const onClose = () => {
        dispatch(setModalDisplay(!modalDisplay))
    }
      
      return (
        <>
        <form onSubmit={handleSubmit} className="signup-form" id="signupForm">
        <div className="signup-form-header">
            <h1 className="signup-header">Sign Up</h1>
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
        <p className="disclaimer" id="top-disclaimer">People who use our service may have uploaded your contact information to Facebook. <a id ="learn-more" className="disclaimer" href="https://www.facebook.com/help/637205020878504">Learn more.</a></p>
        <br></br>
        <p className="disclaimer">By clicking Sign Up, you agree to our <a id="terms" className="disclaimer" href="https://www.facebook.com/legal/terms/update">Terms</a>, <a id="privacy-policy" className="disclaimer" href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0">Privacy Policy</a> and <a id="cookies-policy"className="disclaimer" href="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0">Cookies Policy</a>. You may receive SMS Notifications from us and can opt out any time.</p>
        <button type="submit" className="signup-btn" id="submitBtn">Sign Up</button>
    </form>
    </>
      );
}

export default SignUpForm
  import { useState } from "react";
  import { useLocation } from "react-router-dom";

  function Login() {
    const location = useLocation();
    const [inputEmail, setInputEmail] = useState(location.state?.email || "");
    const [inputPassword, setInputPassword] = useState("");
    const [userType, setUserType] = useState("");

    

    const handleSubmit = (e) => {
      e.preventDefault();
      if (inputEmail === '' && inputPassword === '') {
        alert("Login successful!");
      } else {
        alert("Invalid email or password!");
      }
    };

    return (
      <div className="sts-login login-form-container">
        <h2 className="login-h2">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-row">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="login-input"
            />
          </div>
          <div className="login-form-row">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="login-input"
            />
          </div>
          <div className="login-form-row">
            <label htmlFor="user-type" className="login-label">User Type</label>
            <select name="user-type" value={userType} onChange={(e)=>setUserType(e.target.value)}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  }

  export default Login;

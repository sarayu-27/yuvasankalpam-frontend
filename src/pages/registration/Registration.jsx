import { useState } from "react";
import { useNavigate } from "react-router-dom";

const branches = {
  "B.Tech": ["CSE", "IT", "ECE", "EEE"],
  "M.Tech": ["Software Engineering", "Data Science"],
  Degree: ["B.Com", "B.Sc"],
};

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    college: "",
    specialization: "",
    collegeOther: "",
    specializationOther: "",
    branch: "",
    passOutYear: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full Name must only contain letters and spaces.";
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    console.log(formData);
    navigate("/create-password");
    setIsRegistered(true);
  };

  const handlePopupClose = () => {
    setIsRegistered(false);
    navigate("/create-password");
  };

  return (
    <div className="sts-registration form-container">
      <h2>Join us</h2>
      <form className="registration-form" onSubmit={handleSubmit}method="post">
        {/* Full Name */}
        <div className="form-row">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          {errors.fullName && <small className="error">{errors.fullName}</small>}
        </div>

        {/* Mobile No */}
        <div className="form-row">
          <label htmlFor="mobile">Mobile no</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
          {errors.mobile && <small className="error">{errors.mobile}</small>}
        </div>

        {/* Email */}
        <div className="form-row">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email ID"
            required
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        {/* Address */}
        <div className="form-row">
          <label htmlFor="address">Permanent Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        {/* City */}
        <div className="form-row">
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select your city</option>
            <option value="Godavarikhani">Godavarikhani</option>
            <option value="Ramagundam">Ramagundam</option>
          </select>
        </div>

        {/* College */}
        <div className="form-row">
          <label htmlFor="college">College</label>
          <select
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select your college</option>
            <option value="JNTUH">JNTUH University College of Engineering Manthani</option>
            <option value="Vardhaman">Vardhaman College of Engineering</option>
            <option value="Anurag">Anurag University</option>
            <option value="other">Other</option>
          </select>
        </div>
        {formData.college === "other" && (
          <div className="form-row">
            <label htmlFor="collegeOther">Enter College Name</label>
            <input
              type="text"
              id="collegeOther"
              name="collegeOther"
              value={formData.collegeOther}
              onChange={handleChange}
              placeholder="Enter your college name"
            />
          </div>
        )}

        {/* Specialization */}
        <div className="form-row">
          <label htmlFor="specialization">Specialization/Degree</label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select your specialization</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="other">Other</option>
          </select>
        </div>
        {formData.specialization === "other" && (
          <div className="form-row">
            <label htmlFor="specializationOther">Enter Specialization</label>
            <input
              type="text"
              id="specializationOther"
              name="specializationOther"
              value={formData.specializationOther}
              onChange={handleChange}
              placeholder="Enter your specialization"
            />
          </div>
        )}

        {/* Branch */}
        {formData.specialization && (
          <div className="form-row">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your branch</option>
              {branches[formData.specialization]?.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Pass Out Year */}
        <div className="form-row">
          <label htmlFor="passOutYear">Pass Out Year</label>
          <select
            id="passOutYear"
            name="passOutYear"
            value={formData.passOutYear}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select pass-out year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div className="form-row">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select your course</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Success Popup */}
      {isRegistered && (
        <div className="popup">
          <div className="popup-content">
            <p>Registered successfully!</p>
            <button onClick={handlePopupClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;

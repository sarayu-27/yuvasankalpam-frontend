import { faculty_subjects as subjects,students } from "../../api/data"
import { useState } from "react";

const Attendance = () => {
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
      );
    const [selectedSubject, setSelectedSubject] = useState("");
    const [attendance, setAttendance] = useState({});
    const handleAttendanceChange = (studentId, status) => {
        setAttendance((prevAttendance) => ({
          ...prevAttendance,
          [studentId]: status,
        }));
      };
    const handleSubmit = async () => {
       
          const payload = {
            date: selectedDate,
            subject: selectedSubject,
            attendance: attendance,
          };
          console.log({payload});
          // const res = await fetch("/api/attendance", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(payload),
          // });
    
          // if (!res.ok) {
          //   throw new Error("Failed to save attendance");
          // }
    
      };
    return (
        <div className="sts-attendance">
          <h2>Attendance</h2>
    
          {/* Date Picker */}
          <input
            className="sts-attendance__date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
    
          {/* Subject Dropdown */}
          <select
            className="sts-attendance__subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Subject</option>
            {subjects && subjects.map((subject, index) => (
              <option key={index} value={subject.subject}>
                {subject.subject}
              </option>
            ))}
          </select>
    
          {/* Attendance Table */}
          {selectedSubject && (
            <div>
              <table className="sts-attendance__table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Full Name</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>
                        <button
                          className="sts-attendance__button-present"
                          onClick={() =>
                            handleAttendanceChange(student.id, "present")
                          }
                          style={{
                            backgroundColor:
                              attendance[student.id] === "present"
                                ? "#27AE60"
                                : "#fff",
                            color:
                              attendance[student.id] === "present"
                                ? "#fff"
                                : "#27AE60",
                          }}
                        >
                          Yes
                        </button>
                        <button
                          className="sts-attendance__button-absent"
                          onClick={() =>
                            handleAttendanceChange(student.id, "absent")
                          }
                          style={{
                            backgroundColor:
                              attendance[student.id] === "absent"
                                ? "#C0392B"
                                : "#fff",
                            color:
                              attendance[student.id] === "absent"
                                ? "#fff"
                                : "#C0392B",
                          }}
                        >
                          No
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    
              {/* Submit Button */}
              <button
                className="sts-attendance__submit"
                onClick={handleSubmit}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      );
}

export default Attendance

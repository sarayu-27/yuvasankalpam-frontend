
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TestCard from "./TestCard";
import { setSelectedSubject as subjectObj } from "../../slices/subjectSlice";
import Search from "./Search";

function Assessment() {
  const [subjects, setSubjects] = useState();
  const [selectedSubject, setSelectedSubject] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  useEffect(() => {
      const fetchSubjects = async () => {
        try {
          const res = await fetch("/subjects.json"); // Fetch subjects from endpoint , id
          const data = await res.json();
          setSubjects(data);
        } catch (err) {
          alert(err);
        }
      };
      fetchSubjects();
    }, [dispatch, navigate]);
    useEffect(() => {
        const fetchTests = async () => {
          try {
            const res = await fetch('/assessmentCard.json') // Replace with API endpoint get only latest part cards
            const data = await res.json();
            setTests(data);
          } catch (err) {
            alert(err);
          }
        };
    
        fetchTests();
      }, [dispatch, navigate]);
    const onCreateTest = (()=>{
        const selectedSubjectObj = subjects.find((subject) => subject.subject === selectedSubject);
        console.log(selectedSubjectObj);
        if (selectedSubjectObj) {
            dispatch(subjectObj(selectedSubjectObj));
        }
        navigate('/faculty/testcreation');
    })
  return(
    <div className="sts-assessment">
        <h2>Assessment</h2>
        <select
            className="sts-assessment__subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}>
            {subjects && subjects.map((subject, index) => (
            <option key={index} value={subject.subject}>
                {subject.subject}
            </option>
            ))}
        </select>
        <div className="sts-assessment__create">
            <div className="sts-assessment__create-button">
                {/* <Search 
                  studentsData={assessmentData.studentsData}

                /> */}
                <button onClick={()=>onCreateTest()}><i className="sts-icon material-icons-outlined">add</i>Create New Test</button>
            </div>
        </div>
        <div className="test-cards">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  )
};

export default Assessment;

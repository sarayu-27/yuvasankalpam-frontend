import PropTypes from 'prop-types';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAssessment } from "../../slices/assessmentSlice";
import Settings from './Settings';
import { useEffect,useState } from 'react';

function TestCard({ test}) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const now = new Date();
  const startTime = now.toTimeString().slice(0, 5); // Get current time

  const endTimeObj = new Date(now.getTime() + 30 * 60000); // Add 30 minutes
  const endTime = endTimeObj.toTimeString().slice(0, 5);
  const assessment_id = useSelector((state) => state.assessment.assessment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingsData, setSettingsData] = useState({
      startDate: today,
      startTime: startTime,
      endDate: today,
      endTime: endTime,
      duration: 30,
      message: "Your response is submitted",
    });

  useEffect(()=>{
    if (assessment_id) {
        const fetchTests = async () => {
            try {
              const res = await fetch('/assessmentCard.json') // Replace with API endpoint get only latest part cards
              const data = await res.json();
          setSettingsData(data[0].schedule);
          // we can set the subject if needed
            } catch (err) {
              alert(err);
            }
          };
      
          fetchTests();
      
    }
  },[dispatch,assessment_id]);
  const sendClick = (event,id)=>{
    event.stopPropagation();
    console.log({id});
  };
  const visibilityClick = (event,id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
    navigate('/faculty/view')
  };
  const settingsClick = (event,id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
  }
  const editClick = (event,id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
    navigate('/faculty/testCreation');
  };
  const testResults = (id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
    navigate('/faculty/results');
  };
  return (
    <div className="test-card" id={test.id} onClick={()=>{testResults(test.id)}}>
      <div className="test-card-content">
        <div className="test-card-title"><h3>{test.testTitle}</h3></div>
        <div className="test-card-body">
            <p><i className="material-icons-outlined">library_books</i>  {test.questions.length} Questions</p>
            <p><i className="material-icons-outlined">schedule</i>  {test.schedule.duration} minutes</p>
            <p><i className="material-icons-outlined">group</i>  {test.responses} responses</p>
        </div>
      </div>
      <div className="test-card-options">
        <i className="material-icons-outlined" onClick={(e)=>{visibilityClick(e,test.id)}}>visibility</i>
        <i className="material-icons-outlined" onClick={(e)=> {editClick(e,test.id)}}>edit</i>
        {settingsData && <div onClick={()=>{(e)=>{settingsClick(e,test.id)}}}><Settings settingsDataProp={settingsData} setSettingsData={setSettingsData}></Settings></div>}
        {/* <button>Enable</button> */}
        <button className="test-card-upload" onClick={(e)=>{sendClick(e,test.id)}}>Send</button>
      </div>
    </div>
  );
}

TestCard.propTypes = {
  test: PropTypes.any
};

export default TestCard;

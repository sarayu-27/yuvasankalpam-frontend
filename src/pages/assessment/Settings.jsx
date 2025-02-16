import { useState,useEffect,useRef } from "react";
import PropTypes from 'prop-types';
const Settings = ({settingsDataProp,setSettingsData}) => {
    const settingsRef = useRef(null);
    const [showSettings, setShowSettings] = useState(false);
    const [options, setOptions] = useState({
      startDate: false,
      endDate: false,
      timeDuration: false,
      customizeMessage: false,
    });
    const [settingsData, setSettingsDataLocal] = useState();
    useEffect(() => {
      setSettingsDataLocal(settingsDataProp);
    }, [settingsDataProp]);

    const handleCheckboxChange = (e) => {
      setOptions({
        ...options,
        [e.target.name]: e.target.checked,
      });
    };
   useEffect(() => {
       const handleClickOutside = (event) => {
         if (settingsRef.current && !settingsRef.current.contains(event.target)) {
           setShowSettings(false);
         }
       };
   
       document.addEventListener("mousedown", handleClickOutside);
       return () => {
         document.removeEventListener("mousedown", handleClickOutside);
       };
     }, []);
    const handleInputChange = (e) => {
      const updatedSettingsData = {
        ...settingsData,
        [e.target.name]: e.target.value,
      };
      setSettingsDataLocal(updatedSettingsData);
      setSettingsData(updatedSettingsData); 
    };
    const settingsClick = (event)=>{
      event.stopPropagation();
    }
  return (
    <div className="sts-settings" ref={settingsRef} onClick={(event)=> settingsClick(event)}>
        <button className="sts-settings__icon" onClick={() => setShowSettings(!showSettings)}>
          <i className="material-icons-outlined">settings</i>
        </button>
        {showSettings && (
          <div className="settings-panel">
            <h3>Options for responses</h3>
            {/* Options rendering */}
            <div className="option">
              <label>
                <input
                  type="checkbox"
                  name="startDate"
                  checked={options.startDate}
                  onChange={handleCheckboxChange}
                />
                Start date
              </label>
              <div className="input-group">
                <input type="date" name="startDate" value={settingsData.startDate} onChange={handleInputChange} disabled={!options.startDate} />
                <input type="time" name="startTime" value={settingsData.startTime} onChange={handleInputChange} disabled={!options.startDate} />
              </div>
            </div>
            <div className="option">
            <label>
              <input
                type="checkbox"
                name="endDate"
                checked={options.endDate}
                onChange={handleCheckboxChange}
              />
              End date
            </label>
            <div className="input-group">
              <input type="date" name="endDate" value={settingsData.endDate} onChange={handleInputChange} disabled={!options.endDate} />
              <input type="time" name="endTime" value={settingsData.endTime} onChange={handleInputChange} disabled={!options.endDate} />
            </div>
          </div>

          <div className="option">
            <label>
              <input
                type="checkbox"
                name="timeDuration"
                checked={options.timeDuration}
                onChange={handleCheckboxChange}
              />
              Set Time duration
            </label>
            <div className="input-group">
              <input type="number" name="duration" value={settingsData.duration} min="1" onChange={handleInputChange} disabled={!options.timeDuration} />
              <span className="minutes-label">Minutes</span>
            </div>
          </div>

          <div className="option">
            <label>
              <input
                type="checkbox"
                name="customizeMessage"
                checked={options.customizeMessage}
                onChange={handleCheckboxChange}
              />
              Customize Thank you message
            </label>
            <div className="input-group">
              <input type="text" name="message" value={settingsData.message} onChange={handleInputChange} disabled={!options.customizeMessage} />
            </div>
          </div>
          </div>
        )}
      </div>
  )
}

Settings.propTypes = {
    settingsDataProp: PropTypes.any,
    setSettingsData: PropTypes.any
  };
export default Settings

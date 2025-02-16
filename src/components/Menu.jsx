
  import { HEADER_MENU,userType,FACULTY_HEADER_MENU } from "../api/data";
  import React, { useState, useEffect, useRef, useCallback} from "react";
  import { useNavigate } from 'react-router-dom';

  function Menu() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [menu,setMenu] = useState([]);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    
  
    const toggleDropdown = (index) => {
      setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
    };
    useEffect(()=>{
      if(userType == "Student") 
        setMenu(HEADER_MENU)
      if(userType == 'Faculty')
        setMenu(FACULTY_HEADER_MENU);
    },[HEADER_MENU,FACULTY_HEADER_MENU])
    const handleItemClick = useCallback(
      (course) => {
          if(userType == "Student") {
            if(course.toUpperCase() === 'SYLLABUS') 
            {
                navigate('/student/course');
            }
            if(course.toUpperCase() === 'TEST') {
              navigate('/student/test');
            }
            if(course.toUpperCase() === 'ASSESSMENT') {
                navigate('/student/assessment');
              }
          }
          else if(userType == "Faculty") {
            setMenu(FACULTY_HEADER_MENU);
            if(course.toUpperCase() === 'SYLLABUS') navigate('/faculty/syllabus');
            if(course.toUpperCase() === 'ASSESSMENT') navigate('/faculty/assessment');
            if(course.toUpperCase() === 'ATTENDANCE') navigate('/faculty/attendance');
            if(course.toUpperCase() === 'REPORTS') console.log("hello");
          }
          setActiveDropdown(null);
      },
      [navigate]
    );

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!menuRef.current?.contains(event.target)) {
          setActiveDropdown(null); 
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <ul className="sts-menu" ref={menuRef}>
        { menu.map(({ label, dropdown }, index) => (
          <li key={label} className={`sts-menu__items ${dropdown ? "sts-menu__items-dropdown" : ""}`}>
            <div onClick={() => dropdown ? toggleDropdown(index) : handleItemClick(label) }
                className="sts-menu__items-label">
              {label}
              {dropdown && 
                      <i className="material-icons-outlined">keyboard_arrow_down</i>
              }
            </div>
            {activeDropdown === index && dropdown && (
              <ul className="sts-menu__dropdown-container">
                {dropdown.map(({ label: itemLabel }) => (
                  <li key={itemLabel} onClick={() => handleItemClick(itemLabel)} className="sts-menu__dropdown-item">
                    {itemLabel}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }


  export default React.memo(Menu);


  import { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { setCourse } from '../../slices/courseSlice';
  import image from '../../assets/image.jpeg';
  import {course as courseApi, modules as moduleApi } from '../../api/data';

  function Course() {
    const [moduleData, setModuleData] = useState([]);
    const [courseData, setCourseData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchCourseData = async () => {
          setCourseData(courseApi);
          setModuleData(moduleApi);
      };
      fetchCourseData();
      
    }, [navigate,dispatch]);

  const onCourseClick = ((item)=>{
    dispatch(setCourse(item));
    navigate('/student/syllabus');
  })

    const { id,course } = courseData;

    return (
      <>
      { moduleData ?
        <div className='sts-course' id={id}>
          <div className='sts-course__image'><img src={image} alt="Course" /></div>
          <div className='sts-course__title'>{course}</div>
          <div className='sts-course__modules'>
            <div className='sts-course__modules-title'>Practice by Module</div>
            <div className='sts-course__modules-module'>
              {moduleData.length > 0 ? (
                moduleData.map((item) => (
                  <button key={item.id} id={item.id} onClick={() => onCourseClick({id:item.id,module_name:item.module_name})} >{item.module_name}</button>
                ))
              ) : (
                <div>{"Loading Data..."}</div>
              )}
            </div>
          </div>
        </div> : <div>{"Loading Data..."}</div>
      }
      </>
    );
  }

  export default Course;
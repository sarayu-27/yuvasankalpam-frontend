// import { useSelector } from 'react-redux';
import { useEffect, useState,useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { setError } from '../../slices/errorSlice';
import { faculty_subjects,chapters as chaptersApi,topics,subTopics as subTopicsApi} from '../../api/data';


function FacultySyllabus() {
    // const heading = useSelector((state) => state.heading.heading);
    // const dispatch = useDispatch();

    const [subjects, setSubjects] = useState([]); // List of subjects
    const [selectedSubject, setSelectedSubject] = useState(''); // Selected subject
    const [syllabus, setSyllabus] = useState(''); // Fetched syllabus content
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle state
    // const [chapter,setChapter] = useState(''); 
    const [topic,setTopic] = useState(''); 
    const [subTopics, setSubTopics] = useState({}); 
    const [finishedTopics, setFinishedTopics] = useState([]); 
    const [highlightedTopic, setHighlightedTopic] = useState(null);

    // Fetch subjects from the API on component load
    useEffect(() => {
        setSubjects(faculty_subjects);
    }, []);

    // Handle subject selection
    const handleSubjectSelection = (subject) => {
        setSelectedSubject(subject);
        setDropdownOpen(false); // Close dropdown on selection
        setSyllabus(chaptersApi);
    };

    const onTopicClick = useCallback((id) => {
        // setChapter(id);
        console.log({ id });
        setTopic(topics);
        setHighlightedTopic(id); // Set highlighted topic
      }, []);

    const onTopicHover = (item) => {
        if (subTopics[item]) return; // Avoid redundant API calls

    // Filter subtopics that match the topicId
    const filteredSubTopics = subTopicsApi.filter(subTopic => subTopic.topic_id === item);

    // Update the state by adding subtopics for the hovered topic
    setSubTopics((prev) => ({
        ...prev,
        [item]: filteredSubTopics
    }));
    };

    const onTopicMouseLeave = (id) => {
        setSubTopics((prev) => {
            const updated = { ...prev };
            delete updated[id]; // Remove subtopics for this topic ID on mouse leave
            return updated;
        });
    };
    const onFinishButtonClick = (id) => {
        setFinishedTopics((prev) => [...prev, id]); // Add to finished topics list
    };
    return (
        <div className="sts-faculty--syllabus">
            <h2>Syllabus</h2>
            {/* Dropdown Button */}
            <div className="sts-faculty--syllabus__button-row">
                <button onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown
                        className="dropdown-button">
                    {selectedSubject || 'Subject'}{' '}
                    <i className="sts-icon material-icons-outlined">keyboard_arrow_down</i>
                </button>
                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <ul className="dropdown-menu">
                        {subjects.map((subject, index) => (
                            <li
                                key={index}
                                onClick={() => handleSubjectSelection(subject.subject)} // Handle selection
                                className="dropdown-item"
                            >
                                {subject.subject}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Display syllabus */}
            <div className="sts-faculty--syllabus__content">
                <div className="sts-faculty--syllabus-left__content">
                    {syllabus.length >0 && (
                        <>
                            <h3>Syllabus for {selectedSubject}:</h3>
                            <div className="sts-syllabus__buttons">
                                    {syllabus.length>0 &&
                                      syllabus.map((item) => (
                                        <button
                                          key={item.id}
                                          onClick={() => { onTopicClick(item.id)}}
                                          className={highlightedTopic === item.id ? "highlighted" : ""} // Highlight button
                                        >{item.syllabus_name}</button>
                                      ))}
                                  </div>

                        </>
                    )}
                </div>
                                
                {
                    topic &&
                     <div className="sts-faculty--syllabus-right__content">
                        <ul> {
                            topic.map((item) => (
                               <li key={item.id} onMouseEnter={() => onTopicHover(item.id)} // Fetch subtopics on hover
                                        onMouseLeave={() => onTopicMouseLeave(item.id)}>
                                        {item.topic_name}

                                        {/* Display subtopics */}
                                {/* Display subtopics only for the hovered item */}
                                {subTopics[item.id] && (
                                <>
                                    <ul className="subtopics-list">
                                        {subTopics[item.id].map((subTopic) => (
                                            <li key={subTopic.id} className="subtopic-item">
                                                {subTopic.subtopic_name}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="finish-button-container">
                                        <button className={`finish-button ${finishedTopics.includes(item.id) ? 'finished' : ''}`}
                                                onClick={() => onFinishButtonClick(item.id)}
                                                disabled={finishedTopics.includes(item.id)} // Disable after click
                                                >
                                            {finishedTopics.includes(item.id) ? 'Finished' : 'Finish'}
                                        </button>
                                    </div>
                                    </>
                                )}
                                </li>
                                )) }
                        </ul>
                    </div>
                }                
            </div>
        </div>
    );
}

export default FacultySyllabus;

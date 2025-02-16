import { useCallback, useEffect, useState } from "react";
import { chapters,topics as topicsApi,practice_questions } from '../../api/data';
import Instructions from "./Instructions";
import Questions from "./Questions";
import { useSelector } from 'react-redux';
const Syllabus = () => {
  const course = useSelector((state) => state.course.course);
  const [chaptersData, setChaptersData] = useState([]);
  const [highlightedChapter, setHighlightedChapter] = useState(null);
  const [highlightedTopic, setHighlightedTopic] = useState(null);
  const [topics,setTopics] = useState([]);
  const [chapterName,setChapterName] = useState("");
  const [topicName,setTopicName] = useState("");
  const [questions,setQuestions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const {module_name} = course; //id
  
  useEffect(()=>{
    const fetchSyllabusData = ()=>{
        setChaptersData(chapters);
    };
    fetchSyllabusData();
  },[]);

  const onChapterClick = useCallback((id) => {
    const fetchCourseData = () => {
        console.log(topicsApi);
      setTopics(topicsApi);
    };
    fetchCourseData();
    setHighlightedChapter(id); 

    setToggle(false);
  }, []);

  const onTopicClick = useCallback((item)=>{
    const fetchTopicData = () => {
        setQuestions(practice_questions);
      };
      fetchTopicData();
    setHighlightedTopic(item);
    setToggle(true);
  },[]);

  return (
    <div className="sts-syllabus">
      <div className="sts-syllabus__title">Practice - {module_name}</div>
      <div className="sts-syllabus__buttons">
        {chaptersData &&
          chaptersData.map((item) => (
            <button
              key={item.id}
              onClick={() => { onChapterClick(item.id);setChapterName(item.syllabus_name)}}
              className={highlightedChapter === item.id ? "highlighted" : ""}
            >{item.syllabus_name}</button>
          ))}
      </div>
      <div className="sts-syllabus__content">
      {topics.length > 0  && (
          <aside className="sts-syllabus__content-left">
            <span>{chapterName}</span>
            <ul>
              {
                topics.map((item) => (
                  <li
                    key={item.id}
                    id={item.id}
                    onClick={() => {onTopicClick(item.id);setTopicName(item.topic_name)}}
                    className={`${item.practice_locked ? "disabled": ""} ${highlightedTopic === item.id ? "highlighted" : ""}`} 
                  >
                    {item.topic_name} { item.practice_locked ? <i className="material-icons-outlined">lock</i> : <></>}
                  </li>
                ))}
            </ul>
          </aside>
        )}
        <div className="sts-syllabus__content-right">
        { toggle && questions.length>0 ? (
            <Questions topicObj={questions} topicName={topicName}/>
          ) : (
            <Instructions />
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Syllabus

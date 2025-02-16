  import { Route, Routes } from "react-router-dom";
  import Layout1 from "../../LayoutWithHeader/Layout1";
  import Layout2 from "../../LayoutWithoutHeader/Layout2";
  import Dashboard from './Dashboard';
  import Course from "./Course";
  import Syllabus from './Syllabus';
  import TestQuestions from "./TestQuestions";
  import Test from './Test';
  import TestResults from "./TestResults";
  import Assessment from "./Assessment";


  function UserRoutes() {
      return(
          <Routes>

          {/* Routes with Header and Footer */}
          <Route path="/dashboard" element={<Layout1><Dashboard /></Layout1>}/>
          <Route path="/course" element={<Layout1><Course /></Layout1>} />
          <Route path="/syllabus" element={<Layout1><Syllabus /></Layout1>}/>
          <Route path="/assessment" element={<Layout1><Assessment /></Layout1>}/>
          <Route path="/" element={<Layout1><Dashboard /></Layout1>}/>
          <Route path="/test" element={<Layout1><Test /></Layout1>}/>
          <Route path='/questions/:id' element={<Layout2><TestQuestions /></Layout2>}/>
          <Route path='/results/:id' element={<Layout1><TestResults /></Layout1>}/>
          {/* <Route path="/error" element={<Layout1><Error /></Layout1>}/> */}
        </Routes>
      )
  }

  export default UserRoutes;
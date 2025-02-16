import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout1 from '../../LayoutWithHeader/Layout1';
import Syllabus from "./Syllabus";
import Attendance from "./Attendance";
import Assessment from "../assessment/Assessment";
import TestCreation from "../assessment/TestCreation";
import Settings from "../assessment/Settings";
import ViewQuestions from "../assessment/ViewQuestions";
import Results from "../assessment/Results";
import Report from "../assessment/Report";
// import Search from "../assessment/Search";
// import TestEdit from "../assessment/TestEdit";

function FacultyRoutes() {
    return(
        <Routes>

        {/* Routes with Header and Footer */}
         <Route path="/dashboard" element={<Layout1><Dashboard></Dashboard></Layout1>}/>
         <Route path="/" element={<Layout1><Dashboard /></Layout1>}/>
         <Route path="/syllabus" element={<Layout1><Syllabus></Syllabus></Layout1>}/>
         <Route path="/attendance" element={<Layout1><Attendance></Attendance></Layout1>}/>
         <Route path="/assessment" element={<Layout1><Assessment /></Layout1>}/>
         <Route path="/settings" element={<Layout1><Settings /></Layout1>}/>
         <Route path="/testcreation" element={<Layout1><TestCreation /></Layout1>}/>
         <Route path="/view" element={<Layout1><ViewQuestions/></Layout1>}/>
         <Route path="/results" element={<Layout1><Results/></Layout1>}/>
         {/* <Route path="/search" element={<Layout1><Search/></Layout1>}/> */}
         {/* <Route path="/report" elemet={<Layout1><Report/></Layout1>}/> */}
         <Route path="/report" element={<Layout1><Report/></Layout1>}/>
      </Routes>
    )
}

export default FacultyRoutes;
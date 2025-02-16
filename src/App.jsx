  import { Route, Routes } from "react-router-dom";
  import RegistrationRouter from "./pages/registration/RegistrationRouter";
  import UserRoutes from "./pages/student/UserRoutes";
  import FacultyRoutes from "./pages/faculty/FacultyRoutes";

  function App() {
  

    return (
      <Routes>
        <Route path='/*' element={<RegistrationRouter></RegistrationRouter>}></Route>
        <Route path="/student/*" element={<UserRoutes></UserRoutes>}></Route>
        <Route path="/faculty/*" element={<FacultyRoutes></FacultyRoutes>}></Route>
      </Routes>
    )
  }

  export default App

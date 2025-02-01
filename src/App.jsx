import { Route, Routes } from "react-router-dom";
import RegistrationRouter from "./pages/registration/RegistrationRouter";
import UserRoutes from "./pages/student/UserRoutes";

function App() {
 

  return (
    <Routes>
      <Route path='/*' element={<RegistrationRouter></RegistrationRouter>}></Route>
      <Route path="/student/*" element={<UserRoutes></UserRoutes>}></Route>
    </Routes>
  )
}

export default App

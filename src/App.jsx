import { Route, Routes } from "react-router-dom";
import RegistrationRouter from "./pages/registration/RegistrationRouter";

function App() {
 

  return (
    <Routes>
      <Route path='/*' element={<RegistrationRouter></RegistrationRouter>}></Route>
    </Routes>
  )
}

export default App

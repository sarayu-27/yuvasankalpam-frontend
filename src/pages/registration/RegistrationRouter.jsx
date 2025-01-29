import { Route, Routes, Navigate } from 'react-router-dom';
import Registration from './Registration';
import CreatePassword from './CreatePassword';
import Login from './Login';

const RegistrationRouter = () => {
  return (
       <Routes>
        <Route path="/registration" element={<Registration></Registration>}/>
        <Route path="/create-password" element={<CreatePassword></CreatePassword>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Navigate to="/registration" />} />
       </Routes>
  )
}

export default RegistrationRouter

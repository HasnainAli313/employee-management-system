import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./components/DashBoard";
import EmployeeList from "./components/EmployeeList";
import EmployeeLoginForm from "./components/EmployeeLoginForm";
import ManagerLoginForm from "./components/ManagerLoginForm";

function App() {
  

  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/employeelogin" element={<EmployeeLoginForm/>} />
        <Route path="/managerlogin" element={<ManagerLoginForm/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/employeelist" element={<EmployeeList/>} />
      </Routes>
    </Router>
    
   </>

  )
}

export default App
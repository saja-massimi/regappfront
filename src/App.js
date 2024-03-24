import Register from './Registration';
import Login from './Login';
import Home from './Home';
import {Route, Routes} from "react-router-dom";
import Unathorized from './Unauthorized';
import Departments from './Departments';
import Employees from './Employees';
import AddDepartment from './AddDepartment';

function App() {
  return (
  
      <div> 
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/unauthorized" element={<Unathorized />}/>
        <Route path= "/departments" element = {<Departments/>} />
        <Route path= "/employees" element = {<Employees/>}/>
        <Route path= "/addDepartments" element = {<AddDepartment/>} />

      </Routes> 
      </div>
  
  
    
  );
}
export default App;
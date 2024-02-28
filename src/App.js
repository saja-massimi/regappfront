import Register from './Registration';
import Login from './Login';
import Home from './Home';
import { BrowserRouter, Router,Route, Routes} from "react-router-dom";


function App() {
  return (
   
      <div>
     
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Home />} /> 
        
      </Routes>
   
      </div>
     
     
    
  );
}
export default App;
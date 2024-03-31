import React, { useEffect,useState } from 'react';
import MyNavbar from './MyNavbar';


function AddEmployee() {

const [departments , setDepartments] = useState([]);
const [managers , setManagers] = useState([]);
const [employees, setEmployees] = useState([]);

useEffect( () => {

fetch('https://localhost:7144/api/Departments',{
method: 'GET',  
headers :{'content-type' :'application/json'},  
}).then(response =>{
    return response.json();
}).then (data =>
    setDepartments(data),   
).catch(error => console.log(error));


fetch('https://localhost:7144/api/Employees',{
method : 'GET',
headers :{'content-type' :'application/json'},
}).then(res => {
    return res.json();
}).then(info => {
    setManagers(info)
},
    ).catch(error => console.log(error));
},[]);  

const  handleSubmit = (e) => {
e.preventDefault();
    fetch('https://localhost:7144/api/Employees',{
        method :'POST',
        headers :{'content-type' :'application/json'},
        body: JSON.stringify(employees)

    }).then(response => {
        return response.json();
    }).then(data=>{
        console.log(data);
    }).then(error => 
        console.log(error));
}

const handleChange = (e) => {
    if(e.target.name === 'empID')
    setEmployees({...employees, [e.target.name]: 0});
    if(e.target.name === 'isManger'&& e.target.value === 'false')
    setEmployees({...employees, [e.target.name]: false}); 
    if(e.target.name === 'isManger'&& e.target.value === 'true')
    setEmployees({...employees, [e.target.name]: true});
    else
    setEmployees({...employees, [e.target.name]: e.target.value});
}
    return (
        <div>
            <MyNavbar/>
            <div className='container' style={{paddingTop:'80px'}}>
                <h1>Add Employee</h1>
                <form onSubmit={handleSubmit}>

                    <div className='form-group'>   
                        <input className='form-control' type='hidden' name='empID' onChange={handleChange}/>
                        <label>Employee Name (EN)</label>
                        <input type='text' className='form-control' name='empNameEN' onChange={handleChange}/>
                    </div>

                    <div className='form-group'>
                        <label>Employee Name (AR)</label>
                        <input type='text' className='form-control' onChange={handleChange} name='empNameAR'/>
                    </div>

                    <div className='form-group'>
                        <label>Managers</label>
                        <select className='form-control' onChange={handleChange} name='managerID'>
                    

                            {managers.map((manager ,index) => 
                            {
                                if(manager.isManger === true)
                                return <option  key={index} value={manager.empID}>{manager.empNameEN}</option>
                                else 
                                return null
                            }
                            )}  
                        </select>
                        
                        {console.log(employees)}
                    </div>

                    <br/>
                    <div className='form-control'>
                    Is Manager?
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="isManger" id="yes" onChange={handleChange} value={true.toString()}/>
                    <label className="form-check-label">
                    Yes
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="isManger" id="no" onChange={handleChange} value={false.toString()} />
                    <label className="form-check-label">
                    No
                    </label>
                    </div>
                    </div>

                    <div className='form-group'>
                        <label>Salary</label>
                        <input type='number' className='form-control' max={9000} onChange={handleChange} name='salary'/>
                    </div>
                    <div className='form-group'>
                        <label>Hire Date</label>
                        <input type='datetime-local' className='form-control' onChange={handleChange} name='hireDate'/>
                    </div>
                    <div className='form-group'>
                        <label>Job Title</label>
                        <input type='text' className='form-control' onChange={handleChange} name='jobTitle'/>
                    </div>

                    <div className='form-group'>
                        <label>Department</label>
                        <select className='form-control' onChange={handleChange} name='departmentID'>
                
                        {departments.map((department,index) =>
                            (
                            <option key={index} value={department.id}>{department.departmentNameEN}</option>
                            )

                        )}
                
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Leave Balance</label>
                        <input type='number' className='form-control' onChange={handleChange} name='leaveBalance'/>
                    </div>

                    <div className='form-group'>
                        <label>Created Date</label>
                        <input type='datetime-local' className='form-control' onChange={handleChange} name='empCreated'/>
                    </div>
                    
                    <div className='form-group'>
                        <label>Created By</label>
                        <input type='text' className='form-control' onChange={handleChange} name='empCreatedBy'/>
                    </div>
                    
                    <div className='form-group'>
                        <label>Modified</label>
                        <input type='datetime-local' className='form-control' onChange={handleChange} name='empModified'/>
                    </div>
                    
                    <div className='form-group'>
                        <label>Modified By</label>
                        <input type='text' className='form-control' onChange={handleChange} name='empModifiedBy'/>
                    </div>
                    <br/>
                    <button className='btn btn-primary'>Add</button>
                </form>
            </div>      

        </div>
    );
}

export default AddEmployee;
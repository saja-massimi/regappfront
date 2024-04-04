import React, { useEffect,useState } from 'react';
import MyNavbar from './MyNavbar';
import { useNavigate  } from 'react-router-dom';
import { useForm  } from "react-hook-form";
import {z} from 'zod';

function AddEmployee() {
const { register, formState :{errors,isSubmitting}, handleSubmit} = useForm();

const [departments , setDepartments] = useState([]);
const [managers , setManagers] = useState([]);


let JWTtoken = sessionStorage.getItem('token');
const nav = useNavigate();

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
    setManagers(info);
},
    ).catch(error => console.log(error));
},[]);  

const  onSubmit = (e,data) => {
e.preventDefault();
//Authorization: 'bearer '+ JWTtoken
fetch('https://localhost:7144/api/Employees',{
    method: 'POST',
    headers :{'content-type' :'application/json'}, 
    body: JSON.stringify(data)
}).catch(error => console.error(error));



        
}



    return (
        <div>
            <MyNavbar/>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            
            <div className='container' style={{paddingTop:'80px'}}>
                <h1>Add Employee</h1>

                    <div className='form-group'>   
                        <input className='form-control' type='hidden' name='empID' {...register("empID")}/>
                        <label>Employee Name (EN)</label>
                        <input type='text' className='form-control' name='empNameEN' {...register("empNameEN")}/>
                    </div>

                    <div className='form-group'>
                        <label>Employee Name (AR)</label>
                        <input type='text' className='form-control' name='empNameAR' {...register("empNameAR")} />
                    </div>

                    <div className='form-group'>
                        <label>Managers</label>
                        <select className='form-control' name='managerID' {...register("managerID")}>

                            {managers.map((manager ,index) => 
                            {
                                if(manager.isManger === true)
                                return <option  key={index} value={manager.empID}>{manager.empNameEN}</option>
                                else 
                                return null
                            }
                            )}  

                        </select>
                        
                    </div>

                    <br/>
                    <div className='form-control'>
                    Is Manager?
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="isManger" id="yes" {...register("isManager")} value={true.toString()}/>
                    <label className="form-check-label">
                    Yes
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="isManger" id="no" {...register("isManager")} value={false.toString()} />
                    <label className="form-check-label">
                    No
                    </label>
                    </div>
                    </div>

                    <div className='form-group'>
                        <label>Salary</label>
                        <input type='number' className='form-control' max={9000} {...register("salary")} name='salary'/>
                    </div>
                    <div className='form-group'>
                        <label>Hire Date</label>
                        <input type='datetime-local' className='form-control' {...register("hireDate")} name='hireDate'/>
                    </div>
                    <div className='form-group'>
                        <label>Job Title</label>
                        <input type='text' className='form-control' {...register("jobTitle")} name='jobTitle'/>
                    </div>

                    <div className='form-group'>
                        <label>Department</label>
                        <select className='form-control' {...register("departmentID")} name='departmentID'>
                        {departments.map((department,index) =>
                            (
                            <option key={index} value={department.id}>{department.departmentNameEN}</option>
                            )
                                
                        )}
                
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Leave Balance</label>
                        <input type='number' className='form-control' {...register("leaveBalance")} name='leaveBalance'/>
                    </div>

                    <div className='form-group'>
                        <input type='datetime-local' className='form-control' {...register("empCreated")} name='empCreated' hidden/>
                    </div>
                    
                    <div className='form-group'>
                        <input type='text' className='form-control' {...register("empCreatedBy")} name='empCreatedBy' hidden/>
                    </div>
                    
                    <div className='form-group'>
                        <input type='datetime-local' className='form-control' {...register("empModified")} name='empModified' hidden/>
                    </div>
                    
                    <div className='form-group'>
                        <input type='text' className='form-control' {...register("empModifiedBy")} name='empModifiedBy' hidden/>
                    </div>
                    <br/>
                    <button className='btn btn-primary'   disabled={isSubmitting}  >Add</button>
            </div>      
            </form>
        </div>               

    );
}

export default AddEmployee;
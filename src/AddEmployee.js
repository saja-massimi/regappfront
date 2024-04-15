import React, { useEffect,useState } from 'react';
import MyNavbar from './MyNavbar';
import { useNavigate  } from 'react-router-dom';
import { useForm  } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

function AddEmployee() {
const { register, formState :{errors,isSubmitting}, handleSubmit} = useForm(
    {
        resolver: yupResolver(
            Yup.object().shape({
                empNameEN: Yup.string().min(3).required('Employee Name in english is required'),
                empNameAR: Yup.string().min(3).required('Employee Name in arabic is required'),
                salary: Yup.number('Salary must be a number').min(100).max(10000).required(' Salary is required'),
                hireDate: Yup.date('Hire Date is invalid').required(),
                jobTitle: Yup.string().required(),
                leaveBalance: Yup.number('Leave Balance must be a number').required('Leave Balance is required'),
                isManager: Yup.boolean().required('Choose whether the employee is a manager or not'),
            })
        )
    
    }
);




const [departments , setDepartments] = useState([]);
const [managers , setManagers] = useState([]);


let JWTtoken = sessionStorage.getItem('token');
const nav = useNavigate();

useEffect( () => {

fetch('http://localhost:7144/api/Departments',{
method: 'GET',  
headers :{'content-type' :'application/json'},  
}).then(response =>{
    return response.json();
}).then (data =>
    setDepartments(data),   
).catch(error => console.log(error));


fetch('http://localhost:7144/api/Employees',{
method : 'GET',
headers :{'content-type' :'application/json'},
}).then(res => {
    return res.json();
}).then(info => {
    setManagers(info);
},
    ).catch(error => console.log(error));
},[]);  

const  onSubmit = (data) => {
//Authorization: 'bearer '+ JWTtoken
fetch('http://localhost:7144/api/Employees',{
    method: 'POST',
    headers :{'content-type' :'application/json'}, 
    body: JSON.stringify(data)
}).then(data=>
{
    console.log('Employee added successfully');
    nav('/Employees');

}).catch(error => console.error(error));



        
}



    return (
        <div>
            <MyNavbar/>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            
            <div className='container' style={{paddingTop:'80px'}}>
                <h1>Add Employee</h1>

                    <div className='form-group'>   
                        <input className='form-control' type='hidden' name='empID' value={0} />
                        <label>Employee Name (EN)</label>
                        <input type='text' className='form-control' name='empNameEN' {...register("empNameEN")} />
                        {errors.empNameEN && <p style={{color:'red'}}>{errors.empNameEN.message}</p>}
                    </div>

                    <div className='form-group'>
                        <label>Employee Name (AR)</label>
                        <input type='text' className='form-control' name='empNameAR' {...register("empNameAR")} />
                        {errors.empNameAR && <p style={{color:'red'}}>{errors.empNameAR.message}</p>}
                    </div>

                    <div className='form-group'>
                        <label>Managers</label>
                        <select className='form-control' name='managerID' {...register("managerID")}>

                            {managers.map((manager ,index) => 
                            {
                                if(manager.isManger === true)
                                return <option  key={index} value={manager.empID}>{manager.empNameEN}</option>
                                else 
                                return null;
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
                    {errors.isManager && <p style={{color:'red'}}>{errors.isManager.message}</p>}
                    </div>

                    <div className='form-group'>
                        <label>Salary</label>
                        <input type='number' className='form-control' max={9000} {...register("salary")} name='salary'/>
                        {errors.salary && <p style={{color:'red'}}>{errors.salary.message}</p>}

                    </div>

                    <div className='form-group'>
                        <label>Hire Date</label>
                        <input type='datetime-local' className='form-control' {...register("hireDate")} name='hireDate'/>
                        {errors.hireDate && <p style={{color:'red'}}>{errors.hireDate.message}</p>}

                    </div>
                    <div className='form-group'>
                        <label>Job Title</label>
                        <input type='text' className='form-control' {...register("jobTitle")} name='jobTitle'/>
                        {errors.jobTitle && <p style={{color:'red'}}>{errors.jobTitle.message}</p>}

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
                        {errors.leaveBalance && <p style={{color:'red'}}>{errors.leaveBalance.message}</p>}

                    </div>

                    <br/>
                    <button className='btn btn-primary'   disabled={isSubmitting}  >Add</button>
            </div>      
            </form>
        </div>               

    );
}

export default AddEmployee;
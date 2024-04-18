import React, { useEffect,useState } from 'react';
import MyNavbar from './MyNavbar';
import { useNavigate  } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';

function AddEmployee() {



    let JWTtoken = sessionStorage.getItem('token');


    const formik = useFormik({
        initialValues: {
            empNameEN: '',
            empNameAR: '',
            salary: 0,
            hireDate: '',
            jobTitle: '',
            leaveBalance: 0,
            isManager: '', 
            managerID: 0,
            departmentID: 0
        },
    validationSchema: Yup.object().shape({
        empNameEN: Yup.string().min(3).required('Employee Name in english is required'),
        empNameAR: Yup.string().min(3).required('Employee Name in arabic is required'),
        salary: Yup.number('Salary must be a number').min(100).max(10000).required(' Salary is required'),
        hireDate: Yup.date('Hire Date is invalid').required(),
        jobTitle: Yup.string().required(),
        leaveBalance: Yup.number('Leave Balance must be a number').required('Leave Balance is required'),
        isManager: Yup.boolean().required('Choose whether the employee is a manager or not'),
    }),
    onSubmit: (values) => {
fetch('http://localhost:7144/api/Employees',{
    method: 'POST',
    headers :{'content-type' :'application/json', Authorization: 'bearer '+ JWTtoken}, 
    body: JSON.stringify(values)
}).then(data=>
{
    formik.setSubmitting(false);
    console.log('Employee added successfully');
    nav('/Employees');

}).catch(error => console.error(error));
        

    },
    handleBlur: true,
    validateOnMount: true
    
});


const [departments , setDepartments] = useState([]);
const [managers , setManagers] = useState([]);


const nav = useNavigate();

useEffect( () => {

fetch('http://localhost:7144/api/Departments',{
method: 'GET',  
headers :{'content-type' :'application/json',Authorization: 'bearer '+ JWTtoken},  
}).then(response =>{
    return response.json();
}).then (data =>
    
    setDepartments(data),   
).catch(error => console.log(error));


fetch('http://localhost:7144/api/Employees',{
method : 'GET',
headers :{'content-type' :'application/json',Authorization: 'bearer '+ JWTtoken},
}).then(res => {
    return res.json();
}).then(info => {
    setManagers(info);
},
    ).catch(error => console.log(error));
},[]);  




    return (
        <div>
            <MyNavbar/>
            <form onSubmit={formik.handleSubmit} autoComplete='off'>
            
            <div className='container' style={{paddingTop:'80px'}}>
                <h1>Add Employee</h1>

                    <div className='form-group'>   
                        <input className='form-control' type='hidden' name='empID' value={0} />
                        <label>Employee Name (EN)</label>
                        <input type='text' className='form-control' name='empNameEN'  value={formik.values.empNameEN} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.empNameEN && formik.touched.empNameEN ?<p style={{color:'red'}}>{formik.errors.empNameEN}</p>: null}
                    </div>

                    <div className='form-group'>
                        <label>Employee Name (AR)</label>
                        <input type='text' className='form-control' name='empNameAR'  value={formik.values.empNameAR} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.empNameAR && formik.touched.empNameAR ?<p style={{color:'red'}}>{formik.errors.empNameAR}</p>: null}

                    </div>

                    <div className='form-group'>
                        <label>Managers</label>
                        <select className='form-control' name='managerID' value={formik.values.managerID} onChange={formik.handleChange} onBlur={formik.handleBlur}>

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
                <input className="form-check-input" type="radio" name="isManager" id="yes" value="true" checked={formik.values.isManager === 'true'} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className="form-check-label">
                    Yes
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="isManager" id="no" value="false" checked={formik.values.isManager === 'false'} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className="form-check-label">
                    No
                </label>
                </div>
                {formik.errors.isManager && formik.touched.isManager ? <p style={{ color: 'red' }}>{formik.errors.isManager}</p> : null}
            </div>

                    <div className='form-group'>
                        <label>Salary</label>
                        <input type='number' className='form-control' max={9000}  name='salary' value={formik.values.salary} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.salary && formik.touched.salary ?<p style={{color:'red'}}>{formik.errors.salary}</p>: null}


                    </div>

                    <div className='form-group'>
                        <label>Hire Date</label>
                        <input type='datetime-local' className='form-control'  name='hireDate' value={formik.values.hireDate} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.hireDate && formik.touched.hireDate ?<p style={{color:'red'}}>{formik.errors.hireDate}</p>: null}


                    </div>
                    <div className='form-group'>
                        <label>Job Title</label>
                        <input type='text' className='form-control' name='jobTitle' value={formik.values.jobTitle} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.jobTitle && formik.touched.jobTitle ?<p style={{color:'red'}}>{formik.errors.jobTitle}</p>: null}


                    </div>

                    <div className='form-group'>
                        <label>Department</label>
                        <select className='form-control'  name='departmentID' value={formik.values.departmentID} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        {departments.map((department,index) =>
                            (
                            <option key={index} value={department.id}>{department.departmentNameEN}</option>
                            )
                                
                        )}
                
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Leave Balance</label>
                        <input type='number' className='form-control'  name='leaveBalance' value={formik.values.leaveBalance} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.leaveBalance && formik.touched.leaveBalance ?<p style={{color:'red'}}>{formik.errors.leaveBalance}</p>: null}


                    </div>

                    <br/>
                    <button  type={Button} className='btn btn-primary' disabled={!formik.isValid || formik.isSubmitting} >Add</button>
            </div>      
            </form>
        </div>               

    );
}

export default AddEmployee;
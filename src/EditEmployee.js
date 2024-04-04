import {React,useEffect,useState} from 'react';
import MyNavbar from './MyNavbar';
import { useParams } from 'react-router-dom';

function EditEmployee() {
    const { id } = useParams();
    const [emp, setEmployee] = useState({empID: '',
    empNameEN: '',
    empNameAR: '',
    managerID: '',
    isManger: false, 
    salary: 0, 
    hireDate: '',
    jobTitle: '',
    departmentID: '',
    leaveBalance: 0,
    empCreated: '',
    empCreatedBy: '',
    empModified: '',
    empModifiedBy: ''});
    const [managers, setManagers] = useState([]);
    const [departments , setDepartments] = useState([]);
    let JWTtoken = sessionStorage.getItem('token');


    useEffect(() =>{
fetch(`https://localhost:7144/api/Employees/${id}`,
    {
    method : 'GET',
    headers : {'content-type' : 'application/json',Authorization: 'bearer '+ JWTtoken},
    }).then(
        response => {return response.json();
    }).then(
        data=>{
        setEmployee(data[0]);
    }).catch(
        error => console.error(error));
    
    
        fetch(`https://localhost:7144/api/Employees`,
        {
        method : 'GET',
        headers : {'content-type' : 'application/json',  
        Authorization: 'bearer '+ JWTtoken},
        }).then(
            response => {
                return response.json();
        }).then(
            data=>{
            setManagers(data);
        }).catch(
            error => console.error(error));
        


            fetch('https://localhost:7144/api/Departments',{
                method: 'GET',  
                headers :{'content-type' :'application/json',Authorization: 'bearer '+ JWTtoken},  
                }).then(response =>{
                    return response.json();
                }).then (data =>
                    setDepartments(data),   
                ).catch(error => console.log(error));


    
    },[id]);



    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7144/api/Employees/${id}`,
        {
            body: JSON.stringify(emp),
            method: 'PUT',
            headers : {'content-type' : 'application/json',Authorization: 'bearer '+ JWTtoken}
        }
        ).then((res)=>{
            
            console.log(res);
         //   return res.json();
        }).then((data) => {
        console.log('updated successfully');
        }).catch((error) => {
            console.log(error);
        }
        )

        };



    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, type } = e.target;
    const newValue = type === 'radio' ? (value === 'true') : value;

    setEmployee(prevState => ({
        ...prevState,
        [name]: newValue
    }));
    };


    return (
        <div>
        <MyNavbar/>

        <div className='container' style={{paddingTop:'80px'}}>
                <h1>Edit Employee</h1>
                <form onSubmit={handleSubmit}>

                    <div className='form-group'>   
                        <input className='form-control' type='hidden' name='empID' value={emp.empID}/>
                        <label>Employee Name (EN)</label>
                        <input type='text' className='form-control' name='empNameEN' onChange={handleChange} value={emp.empNameEN}/>
                    </div>

                    <div className='form-group'>
                        <label>Employee Name (AR)</label>
                        <input type='text' className='form-control' onChange={handleChange} name='empNameAR' value={emp.empNameAR}/>
                    </div>

                    <div className='form-group'>
                        <label>Managers</label>
                        <select className='form-control' onChange={handleChange} name='managerID' value={emp.managerID} selected={emp.managerID}>
                    

                            {managers.map((manager ,index) => 
                            {
                                if(manager.isManger === true)
                                return <option  key={index} value={manager.empID} >{manager.empNameEN}</option>
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
                    <input className="form-check-input" type="radio" name="isManger" id="yes" onChange={handleChange} value={true} checked={emp.isManger===true}/>

                    <label className="form-check-label">
                    Yes
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="isManger" id="no" onChange={handleChange} value={false} checked={emp.isManger===false}/>
                    <label className="form-check-label">
                        
                    No
                    </label>
                    </div>
                    </div>

                    <div className='form-group'>
                        <label>Salary</label>
                        <input type='number' className='form-control' max={9000} onChange={handleChange} name='salary' value={emp.salary}/>
                    </div>
                    <div className='form-group'>
                        <label>Hire Date</label>
                        <input type='datetime-local' className='form-control' onChange={handleChange} name='hireDate' value={emp.hireDate}/>
                    </div>
                    <div className='form-group'>
                        <label>Job Title</label>
                        <input type='text' className='form-control' onChange={handleChange} name='jobTitle' value={emp.jobTitle}/>
                    </div>

                    <div className='form-group'>
                        <label>Department</label>
                        <select className='form-control' onChange={handleChange} name='departmentID' value={emp.departmentID}>
                
                        {departments.map((dep,index) =>
                            (
                            <option key={index} value={dep.id}>{dep.departmentNameEN}</option>
                            )

                        )}
                
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Leave Balance</label>
                        <input type='number' className='form-control' onChange={handleChange} name='leaveBalance' value={emp.leaveBalance}/>
                    </div>

                    <div className='form-group'>
                        <label>Created Date</label>
                        <input type='datetime-local' className='form-control' onChange={handleChange} name='empCreated' value={emp.empCreated}/>
                    </div>
                    
                    <div className='form-group'>
                        <label>Created By</label>
                        <input type='text' className='form-control' onChange={handleChange} name='empCreatedBy' value={emp.empCreatedBy}/>
                    </div>
                    
                    <div className='form-group'>
                        <label>Modified</label>
                        <input type='datetime-local' className='form-control' onChange={handleChange} name='empModified' value={emp.empModified}/>
                    </div>
                    
                    <div className='form-group'>
                        <label>Modified By</label>
                        <input type='text' className='form-control' onChange={handleChange} name='empModifiedBy' value={emp.empModifiedBy}/>
                    </div>
                    <br/>
                    <button className='btn btn-primary'>Save</button>
                </form>
            </div>      

        </div>
            




    
    );
}

export default EditEmployee;
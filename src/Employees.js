import React, { useEffect,useState } from 'react';
import MyNavbar from './MyNavbar';
import { useNavigate  } from 'react-router-dom';


function Employees() {
    const nav = useNavigate();
    const[employee,setEmployee] = useState([]);
    let JWTtoken = sessionStorage.getItem('token');
    useEffect(()=>
    {   
        fetch('https://localhost:7144/api/Employees',{
        method: 'GET',
        headers :{'content-type' :'application/json',Authorization: 'bearer '+ JWTtoken},
    } 
        )
        .then(res=>{
        return res.json();
        })
        .then(data=>setEmployee(data))
        .catch(error=>console.error(error));
    },[]);

    const handleAddEmployeeClick = (e) => {
        nav('/addEmployee');        
        

    }

    const handleEditEmployeeClick = ( id) => {
        nav('/editEmployee/'+id);
    }


    const handleDeleteEmployee = (id) => {
    fetch(`https://localhost:7144/api/Employees/${id}`,{
        method: 'DELETE',
        headers :{'content-type' :'application/json',Authorization: 'bearer '+ JWTtoken}, 
    }).then(data => 
        {
            console.log('deleted successfully');
        })
    .catch(error => console.error(error));

    };

    return (

        <>
        <MyNavbar/>
        <div className='container' style={{paddingTop:'80px'}}>
        <div >
        <button className='btn btn-success' onClick={handleAddEmployeeClick}>Add Empolyee</button>
        </div>
            <h1>Employees</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name (EN)</th>
                        <th>Employee Name (AR)</th>
                        <th>ManagerID</th>
                        <th>Is Manager</th>
                        <th>Salary</th>
                        <th>Hire Date</th>
                        <th>Job Title</th>
                        <th>Department Name</th>
                        <th>Leave Balance</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Modified Date</th>
                        <th>Modified By</th>
                        <th>&nbsp;&nbsp;</th>
                    </tr>
                </thead>
                <tbody>

                    {employee.map(emp=>(
                        <tr key={emp.empID}>
                            <td>{emp.empID}</td>
                            <td>{emp.empNameEN}</td>
                            <td>{emp.empNameAR}</td>
                            <td>{emp.managerID}</td>
                            <td>{emp.isManger? 'True':'False'}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.hireDate}</td>
                            <td>{emp.jobTitle}</td>
                            <td>{emp.department.departmentNameEN}</td>
                            <td>{emp.leaveBalance}</td>
                            <td>{emp.empCreated}</td>
                            <td>{emp.empCreatedBy}</td>
                            <td>{emp.empModified}</td>
                            <td>{emp.empModifiedBy}</td>
                            <td><button type='button' className='btn btn-secondary' onClick={()=>handleEditEmployeeClick(emp.empID)}>Edit</button></td>
                            <td><button type='button' className='btn btn-danger' onClick={()=>handleDeleteEmployee(emp.empID)}>Delete</button></td>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
        </>
    );
}

export default Employees;
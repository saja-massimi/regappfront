import React, { useEffect, useState } from 'react';
import MyNavbar from './MyNavbar';
import { useNavigate  } from 'react-router-dom';

function Departments() {

const [departments,setDepartments] = useState([]);

const nav = useNavigate();


const handleAddDepartmentClick = (e) => {
    nav('/addDepartments');
};

const handleEditDepartmentClick = ( id) => {
    nav('/editDepartment/'+id);
};


useEffect(() => {
    fetch('https://localhost:7144/api/Departments',{
        method: 'GET',
        Headers :{'content-type' :'application/json'}, 
    })
    .then(response => response.json())
    .then(data => 
        {
            setDepartments(data)
            console.log(data);
        })
    .catch(error => console.error(error));
    
},  [] );





    return (
        <>
        <div>
        <MyNavbar/>
        <br/>
        <div className='container' style={{paddingTop:'80px'}}>
        <button className='btn btn-success' onClick={handleAddDepartmentClick}>Add Department</button>
        </div>

        <table className='table table-striped'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Department (EN)</th>
                <th>Department (AR)</th>
                <th>Created </th>
                <th>Created By </th>
                <th>Modified </th>
                <th>Modified By</th>
                <th>         </th>

            </tr>
            
        </thead>
        <tbody>

    {departments.map(department=>(
        <tr key={department.id}>
            <td>{department.id}</td>
            <td>{department.departmentNameEN}</td>
            <td>{department.departmentNameAR}</td>
            <td>{department.created}</td>
            <td>{department.createdBy}</td>
            <td>{department.modified}</td>
            <td>{department.modifiedBy}</td>
            <td><button type='button' className='btn btn-secondary' onClick={()=>handleEditDepartmentClick(department.id)}>Edit</button></td>
        </tr>
    ))}
    
    
        </tbody>
        </table>

        </div>
        
        </>
    );
}

export default Departments;
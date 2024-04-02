import React, { useEffect, useState } from 'react';
import MyNavbar from './MyNavbar';
import { useNavigate  } from 'react-router-dom';

function Departments() {

const [departments,setDepartments] = useState([]);
let JWTtoken = sessionStorage.getItem('token');

const nav = useNavigate();


const handleAddDepartmentClick = (e) => {
    nav('/addDepartments');
};

const handleEditDepartmentClick = ( id) => {
    nav('/editDepartment/'+id);
};

const handleDeleteDepartmentClick = (id) => {

    fetch(`https://localhost:7144/api/Departments/${id}`,{
        method: 'DELETE',
        Headers :{'content-type' :'application/json'} 
    })
    .then(response => response.json())
    .then(data => 
        {
            console.log('deleted successfully');
        })
    .catch(error => console.error(error));
}

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
    
},  [JWTtoken] );





    return (
        <>
        <div>
        <MyNavbar/>
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
            <td><button type='button' className='btn btn-danger' onClick={()=>handleDeleteDepartmentClick(department.id)}>Delete</button></td>
        </tr>
    ))}
    
    
        </tbody>
        </table>

        </div>
        
        </>
    );
}

export default Departments;
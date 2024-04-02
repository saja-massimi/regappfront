import React, { useState } from 'react';
import MyNavbar from './MyNavbar';


function AddDepartment() {
    const [department,setDepartments] = useState([]);

const handleSubmit = (e) => { 
    e.preventDefault();

    fetch('https://localhost:7144/api/Departments',{
        method: 'POST',
        headers :{'content-type' :'application/json'}, 
        body: JSON.stringify(department)
    })
    .then(response => {
        return response.json;
    })
    .catch(error => console.error(error));

}

    const handleChange = (e) => {
        if(e.target.name === 'id')
        setDepartments({...department, [e.target.name]: 0});
    else
        setDepartments({...department, [e.target.name]: e.target.value});
    }

    return (
        <div>
    <MyNavbar/>
    <form onSubmit={handleSubmit}>
        <div className='container' style={{paddingTop:'80px'}} >
            <h1>Add Department</h1>
            <div className='form-group'>
            
                <input className='form-control' type='hidden' name='id' onChange={handleChange}/>
                <label>Department Name(EN)</label>
                <input className='form-control' type='text' name='departmentNameEN' onChange={handleChange}/>
                
            </div>
            <div className='form-group'>
                <label>Department Name(AR)</label>
                <input className='form-control' type='text' name='departmentNameAR' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Created</label>
                <input className='form-control' type='datetime-local' name='created' onChange={handleChange}/>
            </div>
            <div className='form-group'>
            
                <label>Created By</label>
                <input className='form-control' type='text' name='createdBy' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Modified</label>
                <input className='form-control' type='datetime-local' name='modified' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Modified By</label>
                <input className='form-control' type='text' name='modifiedBy' onChange={handleChange}/>
            </div>
            <br/>
            <div className='form-group'>
                <button className='btn btn-primary'>Save</button>
            </div>
        </div>        
    </form>

        </div>
    );
}

export default AddDepartment;
import React, { useState } from 'react';


function AddDepartment() {
    const [department,setDepartments] = useState([]);

const handleSubmit = (e) => { 
    e.preventDefault();

    fetch('https://localhost:7144/api/Departments',{
        method: 'POST',
        Headers :{'content-type' :'application/json'}, 
    })
    .then(response => console.log('success'))
    .catch(error => console.error(error));

}

const handleChange = (e) => {
    e.preventDefault();
    setDepartments({...department, [e.target.name]: e.target.value});
}

    return (
        <div>

    <form onSubmit={handleSubmit}>
        <div className='container'>
            <h1>Add Department</h1>
            <div className='form-group'>
                <label>Department Name(EN)</label>
                <input className='form-control' type='text' name='departmentNameEN' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Department Name(AR)</label>
                <input className='form-control' type='text' name='departmentNameAR' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Created</label>
                <input className='form-control' type='date' name='created' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Created By</label>
                <input className='form-control' type='text' name='createdBy' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Modified</label>
                <input className='form-control' type='date' name='modified' onChange={handleChange}/>
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
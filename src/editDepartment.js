import React, { useEffect, useState } from 'react';
import MyNavbar from './MyNavbar';
import { useParams } from 'react-router-dom';


function EditDepartment() {

    const { id } = useParams();
    const [dep, setDepartment] = useState({
    id : 0,
    departmentNameEN:'',
    departmentNameAR:'',
    created: '',
    createdBy: '',
    modified: '',
    modifiedBy: ''
    });


        useEffect(() => {
            fetch(`https://localhost:7144/api/Departments/${id}`,{
                method: 'GET',
                
                headers :{'content-type' :'application/json'},  
            }).then(response =>{
                return response.json()
            }).then(data => {   
                console.log(data[0].modifiedBy);
                setDepartment(data[0]);
                })
            .catch(error => console.error(error));
            
        }, [id]);

        const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7144/api/Departments/${id}`,
        {
            body: JSON.stringify(dep),
            method: 'PUT',
            headers : {'content-type' : 'application/json'}
        }
        ).then((res)=>{
            return res.json();
        }).then((data) => {
        console.log('updated successfully');
        }).catch((error) => {
            console.log(error);
        }
        )

        };

        const handleChange = (e) => {
            e.preventDefault();
            const { name, value } = e.target;

            setDepartment(prevState => ({
                ...prevState,
                [name]: value       
            }));
        };





    return (
        <>
        <MyNavbar/>
        <form onSubmit={handleSubmit}>
        <div className='container' style={{paddingTop:'80px'}}  >
            <h1>Edit Department</h1>
            <div className='form-group'>               
                <label>Department Name(EN)</label>
                <input className='form-control' type='hidden' name='ID' value={dep.ID}/>
                <input className='form-control' type='text' name='departmentNameEN' value={dep.departmentNameEN} onChange={handleChange}/> 
            </div>
            <div className='form-group'>
                <label>Department Name(AR)</label>
                <input className='form-control' type='text' name='departmentNameAR' value={dep.departmentNameAR} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Created</label>
                <input className='form-control' type='datetime-local' name='created' value={dep.created} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label>Created By</label>
                <input className='form-control' type='text' name='createdBy' value={dep.createdBy} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Modified</label>
                <input className='form-control' type='datetime-local' name='modified' value={dep.modified} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label>Modified By</label>
                <input className='form-control' type='text' name='ModifiedBy' value={dep.modifiedBy} onChange={handleChange}/>
            </div>
            <br/>
            <div className='form-group'>
                <button className='btn btn-primary'>Save</button>
            </div>
        </div>        
    </form>


        </>
    );
}

export default EditDepartment;
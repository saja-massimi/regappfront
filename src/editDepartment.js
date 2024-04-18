import React, { useEffect, useState } from 'react';
import MyNavbar from './MyNavbar';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

function EditDepartment() {
    let JWTtoken = sessionStorage.getItem('token');

    const nav = useNavigate();
    const { id } = useParams();
    const [dep, setDepartment] = useState({
    departmentNameEN:'',
    departmentNameAR:'',
    created: '',
    createdBy: '',
    modified: '',
    modifiedBy: ''
    });


        useEffect(() => {

            fetch(`http://localhost:7144/api/Departments/${id}`,{
                method: 'GET',          
                headers :{'content-type' :'application/json',Authorization: 'bearer '+ JWTtoken},  
            }).then(response =>{
                return response.json();
            }).then(data => {   
                setDepartment(data[0]);
                })
            .catch(error => console.error(error));
            
        }, [id]);

        const handleSubmit = (e) => {
            e.preventDefault();
        fetch(`http://localhost:7144/api/Departments/${id}`,
        {
            body: JSON.stringify(dep),
            method: 'PUT',
            headers : {'content-type' : 'application/json',Authorization: 'bearer '+ JWTtoken}
        }
        ).then((data) => {
        

        if(data.status < 399){
        
        console.log('updated successfully');
        nav('/Departments');
    }
        
        }).catch((error) => {
            console.log(error);
        }
        )

        };

        const handleChange = (e) => {
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
    
                <input className='form-control' type='datetime-local' name='created' value={dep.created} onChange={handleChange} hidden/>
            </div>
            
            <div className='form-group'>
                <input className='form-control' type='text' name='createdBy' value={dep.createdBy} onChange={handleChange} hidden/>
            </div>
            <div className='form-group'>
            
                <input className='form-control' type='datetime-local' name='modified' value={dep.modified} onChange={handleChange} hidden />
            </div>
            <div className='form-group'>
    
                <input className='form-control' type='text' name='ModifiedBy' value={dep.modifiedBy} onChange={handleChange} hidden/>
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
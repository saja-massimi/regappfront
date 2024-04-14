import React from 'react';
import MyNavbar from './MyNavbar';
import { useForm  } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";



function AddDepartment() {
    
    const validationSchema = Yup.object().shape({
        departmentNameEN: Yup.string().min(3).required('Department Name in english is required'),
        departmentNameAR: Yup.string().min(3).required('Department Name in arabic is required'),
    });

    const { register, handleSubmit, formState :{errors,isSubmitting}, setError} = useForm({   
        resolver: yupResolver(validationSchema),
    });


    const onSubmit = async (e,data) => {
e.preventDefault();
        fetch('http://localhost:7144/api/Departments', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            });
    }; 

    return (
        <div>
            <MyNavbar />
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                <div className='container' style={{ paddingTop: '80px' }}>
                    <h1>Add Department</h1>

                    <div className='form-group'>
                        <input className='form-control' {...register('id')} type='hidden' name='id' />
                        <label>Department Name (EN)</label>
                        <input className='form-control' {...register('departmentNameEN')}type='text' name='departmentNameEN' />
                        {errors.departmentNameEN && <p style={{color:'red'}}>{errors.departmentNameEN.message}</p>}
                        </div>
                    <div className='form-group'>
                        <label>Department Name (AR)</label>
                        <input className='form-control' {...register('departmentNameAR')} type='text' name='departmentNameAR' />
                        {errors.departmentNameAR && <p style={{color:'red'}}>{errors.departmentNameAR.message}</p>}

                    </div>
                    <div className='form-group'>
                        <input className='form-control' {...register('created')} type='datetime-local' name='created' hidden />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' {...register('createdBy')} type='text' name='createdBy' hidden />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' {...register('modified')} type='datetime-local' name='modified' hidden />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' {...register('modifiedBy')} type='text' name='modifiedBy' hidden />
                    </div>
                    <br />
                    <div className='form-group'>
                        <button className='btn btn-primary' type='submit' disabled={isSubmitting}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddDepartment;
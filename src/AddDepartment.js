import MyNavbar from './MyNavbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate  } from 'react-router-dom';

function AddDepartment() {
    


    let JWTtoken = sessionStorage.getItem('token');

    const nav = useNavigate();
    const formik= useFormik({
        initialValues: {
            departmentNameEN: '',
            departmentNameAR: '',
            
        },

        validationSchema: Yup.object().shape({
            departmentNameEN: Yup.string().required('Department Name in english is required'),
            departmentNameAR: Yup.string().required('Department Name in arabic is required'),
        }),
        onSubmit: (values) => {
            fetch('http://localhost:7144/api/Departments',{
                method: 'POST',
                headers :{'content-type' :'application/json',Authorization: 'bearer '+ JWTtoken}, 
                body: JSON.stringify(values)
                
            }).then(data=>
            {
                formik.setSubmitting(false);
                console.log('Department added successfully');
                nav('/Departments');
        
            }).catch(error => console.error(error));
        },
        
    });



    return (
        <div>
            <MyNavbar />
            <form onSubmit={formik.handleSubmit} autoComplete="off" >
                <div className='container' style={{ paddingTop: '80px' }}>
                    <h1>Add Department</h1>

                    <div className='form-group'>
                        <input className='form-control'  type='hidden' name='id' value={0} />
                        <label>Department Name (EN)</label>
                        <input className='form-control'  type='text' name='departmentNameEN' value={formik.values.departmentNameEN} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.departmentNameEN && formik.touched.departmentNameEN ?<p style={{color:'red'}}>{formik.errors.departmentNameEN}</p>: null}
                        </div>
                    <div className='form-group'>
                        <label>Department Name (AR)</label>
                        <input className='form-control' type='text' name='departmentNameAR' value={formik.values.departmentNameAR} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.departmentNameAR && formik.touched.departmentNameAR ?<p style={{color:'red'}}>{formik.errors.departmentNameAR}</p>: null}
                    </div>
                    
                    <br />
                    <div className='form-group'>
                        <button className='btn btn-primary' type='submit' disabled={!formik.isValid || formik.isSubmitting} >Save</button>
                    </div>
                </div>
            </form>
        </div>
    );

}
export default AddDepartment;
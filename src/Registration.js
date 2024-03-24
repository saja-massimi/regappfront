import './App.css';
import { Link, Navigate } from "react-router-dom";
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function Register() {
    const [isRegistered, setIsRegistered] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("This feild is required").min(3, 'must be at least 3 characters'),
            email: Yup.string().required("This feild is required").email(),
            password: Yup.string().required("This feild is required").min(6, 'must be at least 6 characters'),
        }),
        onSubmit: (values) => {
            console.log(values);

            fetch("https://localhost:7144/api/Registration", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(values)
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setIsRegistered(true);
                } else {
                    setIsRegistered(false);
                }
            }).catch((err) => {
                console.log(err.message);
            });
        },
    handleBlur: true,
    validateOnMount: true
    });


console.log(formik.errors);

    if (isRegistered) {
        return <Navigate to='/Login' />;
    }
else
    return (
        <>
            <div className="container">
                <h1> Register </h1>

                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" className="form-control" value={formik.values.name} onChange={formik.handleChange} name="name" onBlur={formik.handleBlur}  />
                        {formik.errors.name && formik.touched.name ? <p className='error' >{formik.errors.name}</p> : null}
                    </div>
                    
                    <div>
                        <label>Email</label>
                        <input type="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} name="email" onBlur={formik.handleBlur}/>
                        {formik.errors.email && formik.touched.email ? <p className="error" >{formik.errors.email}</p> : null}

                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" className="form-control" value={formik.values.password} onChange={formik.handleChange} name="password" onBlur={formik.handleBlur} />
                        {formik.errors.password && formik.touched.password ? <p className="error" >{formik.errors.password}</p> : null}

                    </div>

                    <div>
                        <br />
                        <input type="submit" value="Register" className="btn btn-primary" disabled={formik.isSubmitting} />
                    </div>

                    <div>
                        <br />
                        <Link to="./Login">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

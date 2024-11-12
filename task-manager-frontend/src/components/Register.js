import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            setMessage(response.data.message);
            setIsAuthenticated(true);
            navigate('/tasks'); 
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                            <p className="text-white-50 mb-5">Create a new account</p>
                            <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
                                <MDBInput wrapperClass='mb-4 w-100' labelClass='text-white' label='Username' name='username' type='text' size="lg" value={formData.username} onChange={handleChange} />
                                <MDBInput wrapperClass='mb-4 w-100' labelClass='text-white' label='Email address' name='email' type='email' size="lg" value={formData.email} onChange={handleChange} />
                                <MDBInput wrapperClass='mb-4 w-100' labelClass='text-white' label='Password' name='password' type='password' size="lg" value={formData.password} onChange={handleChange} />
                                <MDBBtn outline color='white' size='lg' type="submit">Register</MDBBtn>
                            </form>
                            <p className="small mt-3">{message}</p>
                            <p className="small mt-3">Already have an account? <a href="/login" className="text-white-50 fw-bold">Login</a></p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;

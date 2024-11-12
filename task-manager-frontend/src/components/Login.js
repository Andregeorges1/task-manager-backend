import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { login, verifyOTP } from '../services/api';
import './Login.css';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOTP] = useState('');
    const [message, setMessage] = useState('');
    const [isOTPRequested, setIsOTPRequested] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            setIsOTPRequested(true);  
            setMessage('OTP sent to your email. Please verify.');
        } catch (error) {
            setMessage('Error logging in');
        }
    };

    const handleOTPVerification = async (e) => {
        e.preventDefault();
        try {
            await verifyOTP({ email, otp });
            setIsAuthenticated(true);
            navigate('/tasks');
        } catch (error) {
            setMessage('Error verifying OTP');
        }
    };

    return (
        <MDBContainer fluid className="login-container">
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol col="12">
                    <MDBCard className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                            <form onSubmit={handleLogin} className="w-100">
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    labelClass="text-white"
                                    label="Email"
                                    type="email"
                                    size="lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    labelClass="text-white"
                                    label="Password"
                                    type="password"
                                    size="lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <MDBBtn outline color="white" size="lg" type="submit" className="w-100 mb-4">
                                    Login
                                </MDBBtn>
                            </form>

                            {isOTPRequested && (
                                <form onSubmit={handleOTPVerification} className="w-100 mt-4">
                                    <MDBInput
                                        wrapperClass="mb-4 w-100"
                                        labelClass="text-white"
                                        label="Enter OTP"
                                        type="text"
                                        size="lg"
                                        value={otp}
                                        onChange={(e) => setOTP(e.target.value)}
                                    />
                                    <MDBBtn outline color="white" size="lg" type="submit" className="w-100">
                                        Verify OTP
                                    </MDBBtn>
                                </form>
                            )}

                            <p className="small mt-3 text-center">{message}</p>
                            <p className="mb-0 text-center">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;

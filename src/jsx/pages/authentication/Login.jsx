import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../../store/actions/AuthActions';

// image
import login from "../../../assets/images/login-img.png";
import google from "../../../assets/images/download (1).png";
import facebook from "../../../assets/images/download (2).png";
import logoFull from "../../../assets/images/logo-full.png";


function Login (props) {
	
  	const [email, setEmail] = useState('demo@example.com');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('123456');

    const dispatch = useDispatch();
	const navigate = useNavigate()
    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
			return ;
		}
		dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, navigate));
		
    }
	
   

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

	// const element = document.querySelector("body"); 
	// let dataTheme = element.getAttribute("data-theme-version");

  	return (
		<div className="">
			<div className="">
				<div className="">
					<div className="Section">

						<div  className='down'>
                               <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100vh",flexDirection:"column",gap:"20px"}} className='down-body'>
								      <div ><img style={{width:"450px"}} className='login-img' src={login} alt="" /></div>
									  <div><p style={{fontSize:"28px",color:"black",fontWeight:"500"}}>Welcome To <br />Spring Learns</p></div>
									  <p style={{fontSize:"16px",textAlign:"center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
							   </div>

						</div>
						
					 <div className='upper'>

						
						 <div  style={{paddingTop:"80px",paddingBottom:"80px"}} className=" signin">
							<div className="card-body">
								<div className=" mb-2">
									
										<p style={{fontSize:"28px",fontWeight:"700",color:"black"}}>ANGINAT</p>                                                                         
									
								</div>
									
								<h4 style={{fontSize:"24px",marginTop:"20px" ,fontWeight:"500"}} className=" mb-4">Admin Sign in</h4>														
								{props.errorMessage && (
									<div className='text-danger p-1 my-2'>
										{props.errorMessage}
									</div>
								)}
								{props.successMessage && (
									<div className='text-danger p-1 my-2'>
										{props.successMessage}
									</div>
								)}
								<form onSubmit={onLogin}>
									<div className='input'>

									
									<div className="mb-3">
										<label className="mb-1">Email</label>												
										<input type="email" className="form-control"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Type Your Email Address"
										/>									
										{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
									</div>
									<div className="mb-3">
										<label className="mb-1">Password</label>
										<input
											type="password"
											className="form-control"
											value={password}
											placeholder="Type Your Password"
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
										{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
									</div>

									<div>
									<p className='password' onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>
                                     Forgot Password?
                                    </p>
									</div>

								</div>
									<div className="row d-flex justify-content-between mt-4 mb-2">
										<div className="mb-3">
										<div className="form-check custom-checkbox ms-1">
												<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
												<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
											</div>
										</div>
										{/* <div className="mb-3">
											<Link  to="/page-register">Sign up</Link>
										</div> */}
									</div>
									<div style={{marginTop:"20px"}} className="text-center">
										<button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
									</div>
								</form>
								{/* <div className="new-account mt-3">
									<p>Don't have an account? <Link  to="/page-register" className="text-primary">Sign up</Link></p>
								</div> */}
									
								
							</div>
						</div>

						<div style={{display:'flex' ,flexDirection:"column" ,alignItems:"center",justifyContent:"center",marginTop:"0px" ,backgroundColor:"#fff5f4" ,paddingTop:"20px" ,paddingBottom:"20px",height:"240px"}}>
							 <p className='sign-title' style={{fontSize:"15px" ,  textAlign:"center"}}>Or sign in with</p>
							 <div className='google-facebook' style={{display:"flex" ,justifyContent:"center"}}>
								  <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
									  <div><img className='sign-img' style={{width:"28px"}} src={google} alt="" /></div>
									  <div><p className='sign-text' style={{marginTop:"15px",color:"black",fontWeight:"500"}} >Sign in using google</p></div>
								  </div>
								  <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
								      <div><img className='sign-img' style={{width:"28px"}} src={facebook} alt="" /></div>
									  <div><p className='sign-text' style={{marginTop:"15px",color:"black",fontWeight:"500"}}>Sign in using  facebook</p></div>
								  </div>
							 </div>
							   <div className="new-account mt-3">
									<p style={{textAlign:"center"}}>New user? <Link  to="/page-register" className="text-primary">Create an Account</Link></p>
								</div>
							 
						</div>
					  </div>
					</div>
				</div>
			</div>		
		</div>
  	);
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);

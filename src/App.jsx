import { lazy, Suspense, useEffect } from 'react';
/// Components
import Index from './jsx/router/index';
import { connect, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import 'rsuite/dist/rsuite-no-reset.min.css';
import "./assets/css/style.css";
import Forgotpassword from './jsx/pages/authentication/Forgetpassword';
import Resetpassword from './jsx/pages/authentication/Resetpassword';
import Selectone from './jsx/pages/authentication/Selectone';
import School from './jsx/pages/authentication/School';
import Institute from './jsx/pages/authentication/Institute';
import SignUpOTP from './jsx/pages/authentication/SignUpOTP';
import ForgetpassOTP from './jsx/pages/authentication/ForgetpassOTP';
import { RegistrationProvider } from './context/RegistrationContext';




const SignUp = lazy(() => import('./jsx/pages/authentication/Registration'));
const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./jsx/pages/authentication/Login')), 500);
    });
});

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

function App(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        checkAutoLogin(dispatch, navigate);
    }, []);

    let routeblog = (
        <RegistrationProvider>
        <Routes>
            
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<Forgotpassword />} />
            <Route path='/reset-password' element={<Resetpassword />} />
            <Route path='/school' element={<School />} />
            <Route path='/select-one' element={<Selectone/>} />
         
            <Route path='/institute' element={<Institute/>} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/verify-otp' element={<SignUpOTP/>} />
            
            <Route path='/forgotpass-verify-otp' element={<ForgetpassOTP/>} />
            <Route path='/*' element={<Login />} />
            
        </Routes>
        </RegistrationProvider>
    );
    if (props.isAuthenticated) {
        return (
            <>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    <Index />
                </Suspense>
            </>
        );

    } else {
        return (
            <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    {routeblog}
                </Suspense>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(App)); 
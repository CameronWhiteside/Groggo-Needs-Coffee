import SplashModal from '../SplashModal'
import LoginForm from '../../../auth/LoginForm'
import './LoginModal.css'

const LoginModal = ({
    loginMode,
    setLoginMode,
}) => {

    return(
        <SplashModal
            mode={loginMode}
            setMode={setLoginMode}
            width={500}
        >
            <h3 className='modal-title'>Hello, Friend.</h3>
            <h5 className='modal-warning'>Enter those fancy schmancy credentials from way back when and pick up right where you left off.
            </h5>
            <div className='action-container'>
            <LoginForm setLoginMode={setLoginMode}/>
            </div>
        </SplashModal>
    )
}

export default LoginModal

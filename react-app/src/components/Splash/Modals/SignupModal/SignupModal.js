import { Redirect } from 'react-router-dom'
import SplashModal from '../SplashModal'
import SignUpForm from '../../../auth/SignUpForm'
import './SignupModal.css'

const SignupModal = ({
    signupMode,
    setSignupMode,
}) => {

    return(
        <SplashModal
            mode={signupMode}
            setMode={setSignupMode}
            width={500}
        >
            <h3 className='modal-title'>Howdy, Stranger.</h3>
            <h5 className='modal-warning'>This website is only available to users who can type two un-secret words plus one secret word written twice.  You up for the challenge, rockstar?</h5>
            <div className='action-container'>
            <SignUpForm setSignupMode={setSignupMode}/>
            </div>
        </SplashModal>
    )
}

export default SignupModal

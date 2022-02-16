import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Modal = ({
    children,
    mode,
    setMode,
    width,
}) => {

    const hideModal = (e) => {
        e.preventDefault()
        setMode(false)
    }

    return (
        <>
        { mode &&
            <>
                <div className="modal-overlay" onClick={hideModal}>
                    <div className="modal-body" style={{width: `${width}px`}}>
                        <div className='close-button' onClick={hideModal}>
                        </div>
                        {children}
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default Modal

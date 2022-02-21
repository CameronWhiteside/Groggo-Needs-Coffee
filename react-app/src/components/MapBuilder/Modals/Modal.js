import './Modal.css'

const Modal = ({
    children,
    mode,
    setMode,
    width,
    disableOffclick=false
}) => {

    let hideModal = () => { }
    if (!disableOffclick) {
        hideModal = (e) => {
            e.preventDefault()
            setMode(false)
        }
    }

    return (
        <>
        { mode &&
            <>
                <div className="modal-overlay" onClick={hideModal}>
                    <div className="modal-body" style={{width: `${width}px`}}>
                        { !disableOffclick &&
                            <div className='close-button' onClick={hideModal}>
                            </div>
                        }
                        {children}
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default Modal

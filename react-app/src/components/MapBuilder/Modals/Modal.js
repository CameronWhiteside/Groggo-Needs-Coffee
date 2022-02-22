import './Modal.css'

const Modal = ({
    children,
    mode,
    setMode,
    width,
    disableOffclick = false,
    backButton = false,
    onBackClick
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
                        { disableOffclick && backButton &&
                            <div className='back-button control-button' onClick={onBackClick}>
                            </div>
                        }
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

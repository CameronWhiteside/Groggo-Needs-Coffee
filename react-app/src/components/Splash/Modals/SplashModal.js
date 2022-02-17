import './SplashModal.css'

const SplashModal = ({
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
                <div className="splash-modal-overlay">
                    <div className="splash-modal-body"
                        style={{ width: `${width}px` }}
                        onClick={(e) => {
                            e.stopPropagation()
                            // e.preventDefault()
                        }}
                    >
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

export default SplashModal

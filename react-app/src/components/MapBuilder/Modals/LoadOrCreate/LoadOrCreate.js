import Modal from '../Modal'
import './LoadOrCreate.css'

const LoadOrCreate = ({
    welcomeMode,
    setWelcomeMode,
    setLoadMapMode,
    setFeatureList,
    setCurrentMap,
}) => {
    const onConfirm = () => {
        setWelcomeMode(false)
        setLoadMapMode(true)
    }
    const onCancel = () => {

        setFeatureList([])
        setCurrentMap('')
        setWelcomeMode(false)
    }

    return(
        <Modal
            mode={welcomeMode}
            setMode={onCancel}
            width={450}
        >
            <h3 className='modal-title'>Pick One.</h3>
            <h5 className='modal-warning'>Please choose very carefully. You don't always make the best decisions by the looks of it, but I have hope that you will make the correct choice.</h5>
            <div className='action-container'>
            <button
                className='modal-button delete'
                onClick={onConfirm}
                >Load</button>
            <button
                className='modal-button delete'
                onClick={onCancel}
                >Create</button>
            </div>
        </Modal>
    )
}

export default LoadOrCreate

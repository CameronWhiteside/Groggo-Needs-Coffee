import Modal from '../Modal'
// import { Redirect } from 'react-router-dom'
import './ConfirmClear.css'

const ConfirmClear = ({
    clearMapMode,
    setClearMapMode,
    clearMap
}) => {
    const onConfirm = () => {
        clearMap()
    }
    const onCancel = () => {setClearMapMode(false)}

    return(
        <Modal
            mode={clearMapMode}
            setMode={setClearMapMode}
            width={470}
        >
            <h3 className='modal-title'>Watch It Bub.</h3>
            <h5 className='modal-warning'>Your map could already be home to dozens of endemic species. Going full Cargill will clear your map faster
                than you can say "Amazon Rainforest."
            </h5>
            <div className='action-container'>
            <button
                className='modal-button clear'
                onClick={onConfirm}
                >Bulldoze It All</button>
            <button
                className='modal-button clear'
                onClick={onCancel}
                >Save The Whales</button>
            </div>
        </Modal>
    )
}

export default ConfirmClear

import Modal from '../Modal'
import { Redirect } from 'react-router-dom'
import './ConfirmDelete.css'

const ConfirmDelete = ({
    deleteMapMode,
    setDeleteMapMode,
    currentMap
}) => {
    const onConfirm = () => {console.log('deleting', currentMap)}
    const onCancel = () => {setDeleteMapMode(false)}

    return(
        <Modal
            mode={deleteMapMode}
            setMode={setDeleteMapMode}
            width={360}
        >
            <h3 className='modal-title'>You sure?</h3>
            <h5 className='modal-warning'>This action cannot be undone, and this map will be deleted permanently.
            </h5>
            <div className='action-container'>
            <button
                className='modal-button'
                onClick={onConfirm}
                >I'm Sure</button>
            <button
                className='modal-button'
                onClick={onCancel}
                >Go Back</button>
            </div>
        </Modal>
    )
}

export default ConfirmDelete

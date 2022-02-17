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
            width={450}
        >
            <h3 className='modal-title'>Hey Now.</h3>
            <h5 className='modal-warning'>This isn't the kind of relationship you can bring back with a handwritten card and some flowers. Once you delete this map, it's blocking your number and never coming back.        </h5>
            <div className='action-container'>
            <button
                className='modal-button delete'
                onClick={onConfirm}
                >Proceed Recklessly</button>
            <button
                className='modal-button delete'
                onClick={onCancel}
                >Sorry I Misspoke</button>
            </div>
        </Modal>
    )
}

export default ConfirmDelete

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
            <h3 className='modal-title'>Hold Up.</h3>
            <h5 className='modal-warning'>This is not a drill. Once you delete this map, you can't change your mind. It'll be gone forever.
            </h5>
            <div className='action-container'>
            <button
                className='modal-button delete'
                onClick={onConfirm}
                >I Said What I Said.</button>
            <button
                className='modal-button delete'
                onClick={onCancel}
                >Oh, Nevermind.</button>
            </div>
        </Modal>
    )
}

export default ConfirmDelete

import Modal from '../Modal'
import './LoadOrCreate.css'
import { useSelector, useDispatch } from 'react-redux'
import { createMap,getMaps } from '../../../../store/map'

const LoadOrCreate = ({
    welcomeMode,
    setWelcomeMode,
    setLoadMapMode,
    // bork setFeatureList,
    currentName,
    setCurrentMap,
}) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const onLoadSelect = () => {
        setWelcomeMode(false)
        setLoadMapMode(true)
    }
    const onCreate = async () => {
        const newMap = await dispatch(createMap({
            userId: sessionUser.id,
            name: currentName,
            featureList: []
        }))

        dispatch(getMaps(sessionUser.id))
        setCurrentMap(newMap)
        // bork setFeatureList([])
        setWelcomeMode(false)
    }

    return(
        <Modal
            mode={welcomeMode}
            setMode={setWelcomeMode}
            width={450}
            disableOffclick={true}
        >
            <h3 className='modal-title'>Pick One.</h3>
            <h5 className='modal-warning'>Please choose very carefully. You don't always make the best decisions by the looks of it, but I have hope that you will make the correct choice.</h5>
            <div className='action-container'>
            <button
                className='modal-button delete'
                onClick={onLoadSelect}
                >Load</button>
            <button
                className='modal-button delete'
                onClick={onCreate}
                >Create</button>
            </div>
        </Modal>
    )
}

export default LoadOrCreate

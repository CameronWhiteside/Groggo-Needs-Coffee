import Modal from '../Modal'
import './LoadOrCreate.css'
import { useSelector, useDispatch } from 'react-redux'
import { createMap,getMaps } from '../../../../store/map'

const LoadOrCreate = ({
    welcomeMode,
    setWelcomeMode,
    setLoadMapMode,
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
            <h3 className='modal-title'>Choose Wisely.</h3>
            <h5 className='modal-warning'>Would you rather work on one of your previous maps, or are you ready to create a new map from scratch?</h5>
            <div className='action-container'>
            <button
                className='modal-button delete'
                onClick={onLoadSelect}
                >Select From Maps</button>
            <button
                className='modal-button delete'
                onClick={onCreate}
                >Build From Scratch</button>
            </div>
        </Modal>
    )
}

export default LoadOrCreate

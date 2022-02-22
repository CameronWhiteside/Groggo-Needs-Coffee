import {
    useEffect,
    // useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMaps } from '../../../../store/map';
import Modal from '../Modal'
import MapCard from './MapCard';
import './LoadMaps.css'

const LoadMaps = ({
    loadMapMode,
    setLoadMapMode,
    setCurrentMap,
    setCurrentName,
    createNewMap,
    // featureList,
    // setFeatureList,
    // getTitle,
    // currentMap

}) => {

    const dispatch = useDispatch()
    const currentMaps = useSelector(state => state.map);
    const sessionUser = useSelector(state => state.session.user)

    const history = useHistory();

    useEffect(() => {
        dispatch(getMaps(sessionUser.id))
    }, [dispatch, sessionUser.id]);

    const onConfirm = () => {
        createNewMap()
        setLoadMapMode(false)
    }
    const onCancel = () => { history.push('/') }

    return (
        <>
            {currentMaps && Object.values(currentMaps).length > 0 ?
                <Modal
                    mode={loadMapMode}
                    setMode={setLoadMapMode}
                    width={700}
                    disableOffclick={true}
                >


                    <div className='maps-list'>
                        {Object.values(currentMaps).map(map => (
                            <MapCard
                                setCurrentMap={setCurrentMap}
                                setCurrentName={setCurrentName}
                                // bork featureList={featureList}
                                // bork setFeatureList={setFeatureList}
                                setLoadMapMode={setLoadMapMode}
                                key={map.id}
                                map={map}

                            />
                        ))}
                    </div>
                </Modal>

                :


                    <Modal
                    mode={loadMapMode}
                    setMode={setLoadMapMode}
                    width={500}
                    disableOffclick={true}
                >
                    <h3 className='modal-title load'>Ope.</h3>
                    <h5 className='modal-warning'>You haven't made any maps yet, you lil' baby cartographer you. Go explore the world! And map it too, so you can load them here.
                    </h5>
                    <div className='action-container'>
                        <button
                            className='modal-button wide'
                            onClick={onConfirm}
                        >Create A New Map</button>
                        <button
                            className='modal-button wide'
                            onClick={onCancel}
                        >Too Scary. Go Home.</button>
                    </div>
                    </Modal>
            }
        </>
    )
}


    export default LoadMaps

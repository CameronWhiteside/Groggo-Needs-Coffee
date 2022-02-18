import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getMaps, udpateMap, removeMap, createMap } from '../../store/map';

import './MapBuilder.css'
import GridArea from './Visualizer/GridArea/GridArea';
import Lorem from '../Lorem/Lorem';
import ControlPanel from './ControlPanel/ControlPanel';
import ConfirmDelete from './Modals/ConfirmDelete/ConfirmDelete';
import ConfirmClear from './Modals/ConfirmClear/ConfirmClear';
import LoadMaps from './Modals/LoadMaps/LoadMaps';

const MapBuilder = () => {

    const sadSynonyms = [
        'Pathetic',
        'Meager',
        'Hopeless',
        'Sorry',
        'Feeble',
        'Pitiful',
        'Poor',
        'Tragic',
        'Dismal',
        'Dire',
        'Crappy',
        'Shoddy',
        'Miserable',
        'Helpless'
    ]

    const getTitle = () => {
        const index = Math.floor(Math.random() * 14)
        const synonym = sadSynonyms[index]
        return `A ${synonym}, Untitled Map`
    }

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currentMaps = useSelector(state => state.map)

    const [currentMap, setCurrentMap] = useState();
    const [saveText, setSaveText] = useState('Save Map');
    const [currentName, setCurrentName] = useState(getTitle());
    const [editNameMode, setEditNameMode] = useState(false)
    const [loadMapMode, setLoadMapMode] = useState(false)
    const [deleteMapMode, setDeleteMapMode] = useState(false)
    const [clearMapMode, setClearMapMode] = useState(false)
    const [buildFeatureMode, setBuildFeatuerMode] = useState(true)
    const [deleteFeatureMode, setDeleteFeatureMode] = useState(false)

    const [currentMapFeatures, setCurrentMapFeatures] = useState([]);

    const [editAnimationStopped, setEditAnimationStopped] = useState(false)
    const [editAnimationPaused, setEditAnimationPaused] = useState(false)

    const activateDelete = (e) => {
        e.preventDefault()
        setDeleteMapMode(true)
    }

       const activateClear = (e) => {
        e.preventDefault()
        setClearMapMode(true)
    }

    const activateLoad = (e) => {
        e.preventDefault()
        setLoadMapMode(true)
    }

    const udpateName = async (e) => {
        if (currentMap) {
            console.log(`old map`)
            let prevMap = { ...currentMap }
            prevMap.name = currentName
            setCurrentMap(prevMap)
            dispatch(udpateMap(prevMap))
            setEditNameMode(false)
        } else {
            console.log(`new map`)
            const newMap = await dispatch(createMap({
                userId: sessionUser.id,
                name: currentName
            }))

            setCurrentMap(newMap)
            setEditNameMode(false)
        }
    }

    const deleteMap = (e) => {
        dispatch(removeMap(currentMap.id))
        history.push('/')
    }

    const saveMap = async () => {
        if (!currentMap) {
            const newMap = await dispatch(createMap({
                userId: sessionUser.id,
                name: currentName
            }))

            setCurrentMap(newMap)

        } else {
            console.log(`can't save that badboy yet soz`)
        }
        setTimeout(() => {
            setSaveText('Save Map')
        }, 1000)
        setSaveText('Saving Successful!')


    }

    useEffect(() => {
        dispatch(getMaps(sessionUser.id))
    }, []);


    if (!sessionUser) return (
        <Redirect to='/'/>
    )

    return (
            <>
            <div id='medium__background' />
            <ConfirmDelete
                deleteMapMode={deleteMapMode}
                setDeleteMapMode={setDeleteMapMode}
                currentMap={currentMap}
                deleteMap={deleteMap}
            />
            <ConfirmClear
                clearMapMode={clearMapMode}
                setClearMapMode={setClearMapMode}
                currentMap={currentMap}
            />
            <LoadMaps
                loadMapMode={loadMapMode}
                setLoadMapMode={setLoadMapMode}
                userMaps={currentMaps}
                setCurrentMap={setCurrentMap}
                setCurrentName={setCurrentName}
            />
            <div className='map-builder'>
                <main className='build-area'>
                    <div className='build-left'>

                        <ControlPanel
                            activateLoad={activateLoad}
                            activateClear={activateClear}
                            activateDelete={activateDelete}
                            currentMap={currentMap}
                            saveMap={saveMap}
                            saveText={saveText}
                        >
                                 <div className='title-area'>
                        <div className='map-name'>
                            {<form id='update-name'>
                                <textarea
                                    className='name-input'
                                    type='text'
                                    autoFocus={true}
                                    maxLength={24}
                                    disabled={!editNameMode}
                                    onChange={(e) => (setCurrentName(e.target.value))}
                                    value={currentName}
                                />
                             </form>}
                        </div>
                        <div className='edit-name'>
                            {editNameMode && <div className='submit-icon' onClick={udpateName}/>}
                            {!editNameMode && <div className='edit-icon' onClick={() => { setEditNameMode(true) }}/>}
                        </div>
                    </div>
                        </ControlPanel>
                        <button className='visualize-button'>
                            Find Path
                        </button>
                    </div>
                    <div className='build-right'>
                        <GridArea />
                        <div className='instructions'>
                            <div className='info-block'>
                                <Lorem chars='500' />
                            </div>
                            <div className='nav-buttons'>
                                <div className='top-buttons'>
                                    <button onClick={activateLoad}>Load Map</button>
                                    <button>Create New Map</button>
                                    </div>
                                 <div className='bottom-buttons'>
                                    <button>Github</button>
                                    <button onClick={()=>history.push('/')}>Back To Home</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className='info-area'>
                </footer>
            </div>
            </>
        )
}


export default MapBuilder

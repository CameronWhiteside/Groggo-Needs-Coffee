import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getMaps, updateMap, removeMap, createMap } from '../../store/map';
import {
    getFeatures,
    removeMapFeatures,
} from '../../store/feature';
import {
    resetRoadOverlay,
    addPathLine
} from './utils';

import './MapBuilder.css'
import getCityName from './utils/cityNames';
import GridArea from './Visualizer/GridArea/GridArea';
import Lorem from '../Lorem/Lorem';
import ControlPanel from './ControlPanel/ControlPanel';
import ConfirmDelete from './Modals/ConfirmDelete/ConfirmDelete';
import ConfirmClear from './Modals/ConfirmClear/ConfirmClear';
import LoadMaps from './Modals/LoadMaps/LoadMaps';
import LoadOrCreate from './Modals/LoadOrCreate/LoadOrCreate';
import visualizeDijkstra from './Visualizer/graphAlgorithms/dijkstra';


const MapBuilder = () => {

    const getTitle = () => {
        return getCityName()
    }

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currentFeatures = useSelector(state => Object.values(state.feature))

    const [currentMap, setCurrentMap] = useState();
    const [currentName, setCurrentName] = useState(getTitle());
    const [editNameMode, setEditNameMode] = useState(false)
    const [loadMapMode, setLoadMapMode] = useState(false)
    const [welcomeMode, setWelcomeMode] = useState(true)
    const [backToWelcome, setBackToWelcome] = useState(true)
    const [deleteMapMode, setDeleteMapMode] = useState(false)
    const [clearMapMode, setClearMapMode] = useState(false)
    const [pathfindingMode, setPathfindingMode] = useState('inactive')
    const [activeControl, setActiveControl] = useState('')

    const resetPath = () => {
        let nodeList = document.querySelectorAll('.line')
        nodeList.forEach(node => node.remove(`visited`))
        setPathfindingMode(`inactive`)
    }


    const activateDelete = (e) => {
        e.preventDefault()
        resetPath()
        setDeleteMapMode(true)
    }

    const activateClear = (e) => {
        e.preventDefault()
        resetPath()
        setClearMapMode(true)
    }

    const activateLoad = (e) => {
        e.preventDefault()
        resetPath()
        dispatch(getMaps(sessionUser.id))
        setLoadMapMode(true)
        setBackToWelcome(false)
    }


    const updateName = async (e) => {
        resetPath()
        let prevMap = { ...currentMap }
        let newName = document.getElementById('name-input-area').value
        prevMap.name = newName
        setCurrentMap(prevMap)
        dispatch(updateMap(prevMap))
        setEditNameMode(false)
    }

    const clearMap = () => {
        if (currentMap && currentMap.id) {
            dispatch(removeMapFeatures(currentMap.id))
        }
        resetRoadOverlay()
    }

    const deleteCurrentMap = (e) => {
        dispatch(getFeatures(''))
        dispatch(removeMap(currentMap.id))
        resetPath()
        resetRoadOverlay()
        setCurrentMap('')
        setCurrentName('')
        setWelcomeMode(true)
    }

    const createNewMap = async (e) => {
        resetPath()
        resetRoadOverlay()
        let newName = getTitle()
        const newMap = await dispatch(createMap({
            userId: sessionUser.id,
            name: newName,
            featureList: []
        }))

        dispatch(getMaps(sessionUser.id))
        setCurrentMap(newMap)
        setCurrentName(newName)
    }


    useEffect(() => {
        dispatch(getFeatures(currentMap))
    }, [currentMap, dispatch]);

    useEffect(() => {
        resetRoadOverlay()
        for (let i = 0; i < currentFeatures.length; i++) {
            let feature = currentFeatures[i]
            if (feature.featureTypeId >= 3 && feature.featureTypeId <= 5) {
                let startId = `${feature.startLongitude}-${feature.startLatitude}`
                let stopId = `${feature.stopLongitude}-${feature.stopLatitude}`
                let start = document.getElementById(startId)
                let stop = document.getElementById(stopId)
                addPathLine(start, stop, 'road-display-layer', 'fake-street', 18)
            }
        }
    },[currentFeatures])


    if (!sessionUser) return (
        <Redirect to='/'/>
    )

    return (
            <>
            <div id='medium__background' />
            <ConfirmDelete
                deleteMapMode={deleteMapMode}
                setDeleteMapMode={setDeleteMapMode}
                deleteMap={deleteCurrentMap}
                setCurrentName={setCurrentName}
                getTitle={getTitle}
            />
            <ConfirmClear
                clearMapMode={clearMapMode}
                setClearMapMode={setClearMapMode}
                clearMap={clearMap}
            />
            <LoadMaps
                loadMapMode={loadMapMode}
                setLoadMapMode={setLoadMapMode}
                setCurrentMap={setCurrentMap}
                setCurrentName={setCurrentName}
                createNewMap={createNewMap}
                setWelcomeMode={setWelcomeMode}
                backToWelcome={backToWelcome}

            />
            <LoadOrCreate
                welcomeMode={welcomeMode}
                setWelcomeMode={setWelcomeMode}
                setLoadMapMode={setLoadMapMode}
                currentName={currentName}
                setCurrentMap={setCurrentMap}
            />
            <div className='map-builder'>
                <main className='build-area'>
                    <div className='build-left'>

                        <ControlPanel
                            activateLoad={activateLoad}
                            activateClear={activateClear}
                            activateDelete={activateDelete}
                            currentMap={currentMap}
                            activeControl={activeControl}
                            setActiveControl={setActiveControl}
                            pathfindingMode={pathfindingMode}
                            setPathfindingMode={setPathfindingMode}
                            resetPath={resetPath}
                        >
                                 <div className='title-area'>
                        <div className='map-name'>
                            {<form id='update-name'>
                                <textarea
                                    className='name-input'
                                    id='name-input-area'
                                    type='text'
                                    autoFocus={true}
                                    maxLength={18}
                                    disabled={!editNameMode}
                                    onChange={(e) => (setCurrentName(e.target.value))}
                                    value={currentName}
                                    >{currentName}</textarea>
                             </form>}
                        </div>
                        <div className='edit-name'>
                            {editNameMode && <div className='submit-icon' onClick={updateName}/>}
                            {!editNameMode && <div className='edit-icon' onClick={() => { setEditNameMode(true) }}/>}
                        </div>
                    </div>
                        </ControlPanel>
                    </div>
                    <div className='build-right'>
                        <GridArea
                            activeControl={activeControl}
                            setActiveControl={setActiveControl}
                            currentMap={currentMap}
                            currentFeatures={currentFeatures}
                        />
                        <div className='instructions'>
                            <div className='info-block'>
                                <Lorem chars='900' />
                            </div>
                            <div className='nav-buttons'>
                                <div className='top-buttons'>
                                    <button onClick={activateLoad}>Load A Map</button>
                                    <button onClick={createNewMap}>Create A New Map</button>
                                    </div>
                                 <div className='bottom-buttons'>
                                    <button>View On Github</button>
                                    <button onClick={()=>history.push('/')}>Back To Home</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            </>
        )
}


export default MapBuilder

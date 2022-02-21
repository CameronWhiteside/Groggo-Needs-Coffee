import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getMaps, updateMap, removeMap, createMap } from '../../store/map';
import { getFeatures, removeMapFeatures, removeFeature, createFeature, updateFeature } from '../../store/feature';
import { addPathLine } from './Visualizer/graphAlgorithms/dijkstra';

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
    const currentMaps = useSelector(state => state.map)
    const currentStoreFeatures = useSelector(state => state.feature)

    const [currentMap, setCurrentMap] = useState();
    const [saveText, setSaveText] = useState('Save Map');
    const [currentName, setCurrentName] = useState(getTitle());
    const [editNameMode, setEditNameMode] = useState(false)
    const [loadMapMode, setLoadMapMode] = useState(false)
    const [welcomeMode, setWelcomeMode] = useState(true)
    const [deleteMapMode, setDeleteMapMode] = useState(false)
    const [clearMapMode, setClearMapMode] = useState(false)
    const [pathfindingMode, setPathfindingMode] = useState(false)
    // bork const [featureList, setFeatureList] = useState([]);
    const [activeControl, setActiveControl] = useState('water')

    const resetPath = () => {
        let nodeList = document.querySelectorAll('.line')
        nodeList.forEach(node => node.remove(`visited`))
        setPathfindingMode(false)
    }

    const resetRoadOverlay = () => {
        let roadDisplay = document.getElementById('road-display-layer')
        roadDisplay.innerHTML = ''
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
    }

    const activateWelcome = (e) => {
        e.preventDefault()
        resetPath()
        dispatch(getMaps(sessionUser.id))
        setWelcomeMode(true)
    }

    const updateFeatures = (currentMap) => {
        resetPath()
        resetRoadOverlay()
        if (currentMap) {
            let mapFeatures = currentMap.features
            let storeFeatures = Object.values(currentStoreFeatures)
            console.log(`lookin at id `, currentMap.id)
            console.log(`if you wanted a store`, currentStoreFeatures)
            console.log(`store has `, Object.keys(currentStoreFeatures).length)
            let mapFeatureInfo = mapFeatures.map(feature => {

                let nodes = {}
                let adjacentNodes = { streets: {}, highways: {}}

                if (feature.feature_type_id === 6 || feature.feature_type_id === 7) {
                    for (let x = feature.start_longitude; x <= feature.stop_longitude; x++) {
                        for (let y = feature.start_latitude; y <= feature.stop_latitude; y++) {
                            nodes[`${x}-${y}`] = `${x}-${y}`
                        }
                    }
                }

                if (feature.feature_type_id >= 3 && feature.feature_type_id <= 5) {
                    let startId = `${feature.start_longitude}-${feature.start_latitude}`
                    let stopId = `${feature.stop_longitude}-${feature.stop_latitude}`
                    nodes[startId] = startId
                    nodes[stopId] = stopId
                    let start = document.getElementById(startId)
                    let stop = document.getElementById(stopId)
                    addPathLine(start, stop, 'road-display-layer', 'fake-street', 18)
                }

                let featureObj = {
                    name: feature.name,
                    featureTypeId: feature.feature_type_id,
                    typeName: feature.type_name,
                    startLatitude: feature.start_latitude,
                    startLongitude: feature.start_latitude,
                    stopLatitude: feature.start_latitude,
                    stopLongitude: feature.stop_longitude,
                    nodes
                }


                return featureObj

            })
            console.log(`using these mapFeautres`, mapFeatureInfo)
            console.log(`the store is this tho`, storeFeatures)

            // bork setFeatureList(mapFeatureInfo)
        }
    }

    const updateName = async (e) => {
        resetPath()
        if (currentMap) {
            let prevMap = { ...currentMap }
            prevMap.name = currentName
            setCurrentMap(prevMap)
            dispatch(updateMap(prevMap))
            setEditNameMode(false)
        } else {
            const newMap = await dispatch(createMap({
                userId: sessionUser.id,
                name: currentName,
                // bork featureList: [...featureList]
                featureList: []
            }))

            setCurrentMap(newMap)
            setEditNameMode(false)
        }
    }

    const clearMap = () => {
        if (currentMap && currentMap.id) {
            dispatch(removeMapFeatures(currentMap.id))
        }
        resetRoadOverlay()
        // bork setFeatureList([])
    }

    const deleteMap = (e) => {
        dispatch(removeMap(currentMap.id))
        setCurrentMap('')
        setCurrentName('')
        // bork setFeatureList([])
        setWelcomeMode(true)
    }

    const createNewMap = async (e) => {

        let newName = getTitle()
        const newMap = await dispatch(createMap({
            userId: sessionUser.id,
            name: newName,
            featureList: []
        }))

        dispatch(getMaps(sessionUser.id))
        setCurrentMap(newMap)
        setCurrentName(newName)
        // setFeatureList([])
    }

    const saveMap = async () => {

            const updatedMap = await dispatch(updateMap({
                id: currentMap.id,
                name: currentName,
                // featureList
            }))

            dispatch(getMaps(sessionUser.id))
            setCurrentMap(updatedMap)
        // }
        setTimeout(() => {
            setSaveText('Save Map')
        }, 600)
        setSaveText('Saving Successful!')
    }

    useEffect(() => {
        dispatch(getMaps(sessionUser.id))
        updateFeatures(currentMap)
    }, []);


    useEffect(() => {
        updateFeatures(currentMap)
        if (currentMap) {
            dispatch(getFeatures(currentMap.id))
        }
    },[currentMap])



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
                setCurrentName={setCurrentName}
                getTitle={getTitle}
            />
            <ConfirmClear
                clearMapMode={clearMapMode}
                setClearMapMode={setClearMapMode}
                currentMap={currentMap}
                clearMap={clearMap}
            />
            <LoadMaps
                loadMapMode={loadMapMode}
                setLoadMapMode={setLoadMapMode}
                userMaps={currentMaps}
                currentMap={currentMap}
                setCurrentMap={setCurrentMap}
                getTitle={getTitle}
                setCurrentName={setCurrentName}
                // bork featureList={featureList}
                // bork setFeatureList={setFeatureList}

            />
            <LoadOrCreate
                welcomeMode={welcomeMode}
                setWelcomeMode={setWelcomeMode}
                setLoadMapMode={setLoadMapMode}
                currentName={currentName}
                setCurrentName={setCurrentName}
                // bork setFeatureList={setFeatureList}
                setCurrentMap={setCurrentMap}
                getTitle={getTitle}
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
                            activeControl={activeControl}
                            setActiveControl={setActiveControl}
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
                            {editNameMode && <div className='submit-icon' onClick={updateName}/>}
                            {!editNameMode && <div className='edit-icon' onClick={() => { setEditNameMode(true) }}/>}
                        </div>
                    </div>
                        </ControlPanel>
                        {!pathfindingMode ?
                            <button
                                className='visualize-button'
                                onClick={() => {
                                    // setPathfindingMode(true)
                                    visualizeDijkstra(setPathfindingMode)
                                }}
                            >
                                Find Path
                            </button>
                            :
                            <button
                                className='visualize-button'
                                onClick={resetPath}
                            >
                                Reset
                            </button>
                        }
                    </div>
                    <div className='build-right'>
                        <GridArea
                            activeControl={activeControl}
                            setActiveControl={setActiveControl}
                            // setFeatureList={setFeatureList}
                            // featureList={featureList}
                            updateFeatures={updateFeatures}
                            currentMap={currentMap}
                        />
                        <div className='instructions'>
                            <div className='info-block'>
                                <Lorem chars='500' />
                            </div>
                            <div className='nav-buttons'>
                                <div className='top-buttons'>
                                    <button onClick={activateLoad}>Load Map</button>
                                    <button onClick={createNewMap}>Create New Map</button>
                                    </div>
                                 <div className='bottom-buttons'>
                                    <button>Github</button>
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

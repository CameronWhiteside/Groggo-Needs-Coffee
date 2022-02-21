import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getMaps, updateMap, removeMap, createMap } from '../../store/map';

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

    const [currentMap, setCurrentMap] = useState();
    const [saveText, setSaveText] = useState('Save Map');
    const [currentName, setCurrentName] = useState(getTitle());
    const [editNameMode, setEditNameMode] = useState(false)
    const [loadMapMode, setLoadMapMode] = useState(false)
    const [welcomeMode, setWelcomeMode] = useState(false)
    const [deleteMapMode, setDeleteMapMode] = useState(false)
    const [clearMapMode, setClearMapMode] = useState(false)
    const [pathfindingMode, setPathfindingMode] = useState(false)
    const [featureList, setFeatureList] = useState([]);
    const [activeControl, setActiveControl] = useState('water')

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
        dispatch(getMaps(sessionUser.id))
        setLoadMapMode(true)
    }

    const activateWelcome = (e) => {
        e.preventDefault()
        dispatch(getMaps(sessionUser.id))
        setWelcomeMode(true)
    }

    const updateFeatures = (currentMap) => {
        if (currentMap) {
            let mapFeatures = currentMap.features
            let mapFeatureInfo = mapFeatures.map(feature => {

                let nodes = {}

                for (let x = feature.start_longitude; x <= feature.stop_longitude; x++) {
                    for (let y = feature.start_latitude; y <= feature.stop_latitude; y++) {
                        nodes[`${x}-${y}`] = `${x}-${y}`
                    }
                }

                let featureObj = {
                    name: feature.name,
                    featureTypeId: feature.feature_type_id,
                    typeName: feature.type_name,
                    startLatitude: feature.start_latitude,
                    startLongitude: feature.start_longitude,
                    stopLatitude: feature.stop_latitude,
                    stopLongitude: feature.stop_longitude,
                    nodes
                }

                return featureObj

            })
            console.log(`updating features`)
            console.log(mapFeatureInfo)
            setFeatureList(mapFeatureInfo)
        }
    }

    const updateName = async (e) => {
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
                featureList
            }))

            setCurrentMap(newMap)
            setEditNameMode(false)
        }
    }

    const deleteMap = (e) => {
        dispatch(removeMap(currentMap.id))
        setCurrentMap('')
        setCurrentName('')
        setFeatureList([])
        setWelcomeMode(true)
    }

    const saveMap = async () => {

        if (!currentMap) {
            const newMap = await dispatch(createMap({
                userId: sessionUser.id,
                name: currentName,
                featureList
            }))

            dispatch(getMaps(sessionUser.id))
            setCurrentMap(newMap)


        } else {
            const updatedMap = await dispatch(updateMap({
                id: currentMap.id,
                name: currentName,
                featureList
            }))

            dispatch(getMaps(sessionUser.id))
            setCurrentMap(updatedMap)
        }
        setTimeout(() => {
            setSaveText('Save Map')
        }, 600)
        setSaveText('Saving Successful!')


    }

    const resetPath = () => {
        let nodeList = document.querySelectorAll('.line')
        nodeList.forEach(node => node.remove(`visited`))
        setPathfindingMode(false)
    }

    useEffect(() => {
        dispatch(getMaps(sessionUser.id))
    }, []);


    useEffect(() => {
        updateFeatures(currentMap)
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
            />
            <LoadMaps
                loadMapMode={loadMapMode}
                setLoadMapMode={setLoadMapMode}
                userMaps={currentMaps}
                currentMap={currentMap}
                setCurrentMap={setCurrentMap}
                getTitle={getTitle}
                setCurrentName={setCurrentName}
                featureList={featureList}
                setFeatureList={setFeatureList}

            />
            <LoadOrCreate
                welcomeMode={welcomeMode}
                setWelcomeMode={setWelcomeMode}
                setLoadMapMode={setLoadMapMode}
                setCurrentName={setCurrentName}
                setFeatureList={setFeatureList}
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
                            setFeatureList={setFeatureList}
                            featureList={featureList}
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
                                    <button onClick={activateWelcome}>Create New Map</button>
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

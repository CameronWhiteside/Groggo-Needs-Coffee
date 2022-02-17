import Lottie from 'react-lottie';
import React, { useEffect, useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import * as editAnimation from '../../assets/lotties/edit-button.json'

import './MapBuilder.css'
import { fetchMaps, saveCurrentMap } from './utils/mapFetch';
import GridArea from './Visualizer/GridArea/GridArea';
import Lorem from '../Lorem/Lorem';
import ControlPanel from './ControlPanel/ControlPanel';
import Modal from './Modals/Modal'
import ConfirmDelete from './Modals/ConfirmDelete/ConfirmDelete';
import ConfirmClear from './Modals/ConfirmClear/ConfirmClear';
import LoadMaps from './Modals/LoadMaps/LoadMaps';

const MapBuilder = () => {

    const sessionUser = useSelector(state => state.session.user);

    const [currentMap, setCurrentMap] = useState();
    const [currentName, setCurrentName] = useState('');
    const [editNameMode, setEditNameMode] = useState(currentMap)
    const [loadMapMode, setLoadMapMode] = useState(false)
    const [deleteMapMode, setDeleteMapMode] = useState(false)
    const [clearMapMode, setClearMapMode] = useState(false)
    const [buildFeatureMode, setBuildFeatuerMode] = useState(true)
    const [deleteFeatureMode, setDeleteFeatureMode] = useState(false)

    const [allMaps, setAllMaps] = useState([]);
    const [currentMapFeatures, setCurrentMapFeatures] = useState([]);

    const [editAnimationStopped, setEditAnimationStopped] = useState(false)
    const [editAnimationPaused, setEditAnimationPaused] = useState(false)

    const activateDelete = (e) => {
        e.preventDefault()
        setDeleteMapMode(true)
    }



    const activateLoad = (e) => {
        e.preventDefault()
        setLoadMapMode(true)
    }

    const udpateName = (e) => {
        console.log(`save the new name to ${currentName}`)
        setEditNameMode(false)
    }

    if (currentMap) {
        setCurrentName(currentMap.name)
    }

    useEffect(() => {
            fetchMaps(sessionUser.id, setAllMaps)
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
            />
            <ConfirmClear
                clearMapMode={clearMapMode}
                setClearMapMode={setClearMapMode}
                currentMap={currentMap}
            />
            <LoadMaps
                loadMapMode={loadMapMode}
                setLoadMapMode={setLoadMapMode}
            />
            <div className='map-builder'>
                <header className='header-area'>
                    <div className='title-area'>
                        <div className='map-name'>
                            {<form id='update-name' onSumbit={udpateName}>
                                <input
                                    className='name-input'
                                    type='text'
                                    placeholder='Enter Map Name'
                                    disabled={!editNameMode}
                                    onChange={(e) => (setCurrentName(e.target.value))}
                                    value={currentName}
                                    size={currentName.length}
                                />
                                {/* <input
                                    className='border-only'
                                    type='text'
                                    placeholder='Enter Map Name'
                                    values={currentName}
                                    size={currentName.length}
                                    disabled
                                /> */}


                            </form>}
                        </div>
                        <div className='edit-name'>
                            {editNameMode && <div className='submit-icon' onClick={udpateName}/>}
                            {!editNameMode && <div className='edit-icon' onClick={() => { setEditNameMode(true) }}/>}
                        </div>
                    </div>
                    <div className='button-area'>
                        <div className='top-buttons'>
                            <button onClick={activateLoad}>Load Map</button>
                            <button onClick={activateDelete}>Delete Map</button>
                            {/* <button onClick={activateClear}>Clear Map</button> */}
                        </div>
                        <div className='bottom-buttons'>
                            <button>Save Map</button>
                            <button>Log Out</button>
                        </div>
                    </div>
                </header>
                <main className='build-area'>
                        <ControlPanel
                            clearMapMode={clearMapMode}
                            setClearMapMode={setClearMapMode}
                            currentMap={currentMap}
                        />
                        <GridArea/>
                </main>
                <footer className='info-area'>
                    <div className='instructions'>
                        <Lorem chars='500'/>
                    </div>
                    <button className='visualize-button'>
                        Find Coffee
                    </button>
                </footer>
            </div>
            </>
        )
}


export default MapBuilder

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

    const sessionUser = useSelector(state => state.session.user);
    const [currentMap, setCurrentMap] = useState();
    const [currentName, setCurrentName] = useState(getTitle());
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

       const activateClear = (e) => {
        e.preventDefault()
        setClearMapMode(true)
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

    // let placeholder

    // useEffect(() => {
    //     if (editNameMode) {
    //         placeholder = `Enter Name`
    //     } else if (currentName) {
    //         placeholder = currentName
    //     } else {
    //         placeholder = `Untitled Map`
    //     }
    //     console.log({placeholder})
    // }, [editNameMode, currentName])


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
                <main className='build-area'>
                    <div className='build-left'>

                        <ControlPanel
                            activateLoad={activateLoad}
                            activateClear={activateClear}
                            activateDelete={activateDelete}
                            currentMap={currentMap}
                        >
                                 <div className='title-area'>
                        <div className='map-name'>
                            {<form id='update-name' onSumbit={udpateName}>
                                <textarea
                                    className='name-input'
                                    type='text'
                                    autoFocus={true}
                                    maxLength={24}
                                    // placeholder={placeholder}
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
                                    <button>About</button>
                                    </div>
                                 <div className='bottom-buttons'>
                                    <button>Github</button>
                                    <button>Log Out</button>
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

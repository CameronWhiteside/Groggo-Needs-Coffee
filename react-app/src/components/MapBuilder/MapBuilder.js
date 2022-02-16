import React, { useEffect, useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector,} from 'react-redux';

import './MapBuilder.css'
import { fetchMaps, saveCurrentMap } from './utils/mapFetch';
import GridArea from './Visualizer/GridArea/GridArea';
import Lorem from '../Lorem/Lorem';
import ControlPanel from './ControlPanel/ControlPanel';

const MapBuilder = () => {

    const sessionUser = useSelector(state => state.session.user);

    const [editNameMode, setEditNameMode] = useState(false)
    const [loadMapMode, setLoadMapMode] = useState(false)
    const [deleteMapMode, setDeleteMapMode] = useState(false)
    const [clearMapMode, setClearMapMode] = useState(false)
    const [buildFeatureMode, setBuildFeatuerMode] = useState(true)
    const [deleteFeatureMode, setDeleteFeatureMode] = useState(false)

    const [allMaps, setAllMaps] = useState([]);
    const [currentMap, setCurrentMap] = useState([]);
    const [currentMapFeatures, setCurrentMapFeatures] = useState([]);



    useEffect(() => {
            fetchMaps(sessionUser.id, setAllMaps)
    }, []);


    if (!sessionUser) return (
        <Redirect to='/'/>
    )

    return (
            <>
            <div id='medium__background' />
            <div className='map-builder'>
                <header className='header-area'>
                    <div className='title-area'>
                        <div className=''>Name Component</div>
                        <div>Edit Name</div>
                    </div>
                    <div className='button-area'>
                        <div className='top-buttons'>
                            <button>Save Map</button>
                            <button>Clear Map</button>
                        </div>
                        <div className='bottom-buttons'>
                            <button>Load Map</button>
                            <button>Delete Map</button>
                        </div>
                    </div>
                </header>
                <main className='build-area'>
                        <ControlPanel/>
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

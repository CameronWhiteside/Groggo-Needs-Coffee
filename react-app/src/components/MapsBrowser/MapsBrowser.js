import React, { useEffect, useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector,} from 'react-redux';
import MapCard from './MapCard';
import './MapsBrowser.css'

const MapsBrowser = () => {

    const sessionUser = useSelector(state => state.session.user);
    const [editMode, setEditMode] = useState(false)

    const [maps, setMaps] = useState([]);

    useEffect(() => {
          async function fetchMaps() {
            const response = await fetch(`/api/users/${sessionUser.id}/maps`);
            const responseData = await response.json();
            setMaps(responseData.maps);
            }
            fetchMaps();
    }, []);

    const toggleEditMode = () => setEditMode(!editMode)

    if (!sessionUser) return (
        <Redirect to='/'/>
    )

    return (
            <>
            <div id='medium__background' />
            <div id="flex__container">
                <div className="flex-child flex-30">
                    <div className="splash-nav-content">
                        <h1>All Maps</h1>
                        <div className="button-area">
                            <NavLink to='/maps/new' className='big-button dark' exact={true} activeClassName='active'>Create A Map</NavLink>
                            { editMode ?
                                <button className='big-button dark' onClick={toggleEditMode}>Done Editing</button>
                                :
                                <button className='big-button dark' onClick={toggleEditMode}>Manage Maps</button>
                            }
                            <NavLink to='/' className='big-button dark' exact={true} activeClassName='active'>Back to Home</NavLink>
                        </div>
                    </div>
                </div>
                <div className='flex-child flex-70'>
                    <div className='maps-list'>
                            {maps.map(map => (
                                <MapCard key={map.id} map={map}/>
                            ))}
                    </div>
                </div>
            </div>
            </>
    )
}


export default MapsBrowser

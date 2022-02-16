import React, { useEffect, useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector,} from 'react-redux';
import MapCard from './MapCard';
import './LoadMaps.css'

const LoadMaps = () => {

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
            <div className='maps-list'>
                {maps.map(map => (
                    <MapCard key={map.id} map={map}/>
                    ))}
            </div>
    )
}


export default LoadMaps

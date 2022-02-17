import { NavLink } from "react-router-dom"
import { useState } from "react"
import './MapCard.css'

const MapCard = (map, allMaps, setAllMaps) => {
    let currentMap = map.map
    let id = currentMap.id
    let default_name = currentMap.name
    let createdAt = new Date(map.map.created_at).toLocaleDateString("en-US")
    let updatedAt = new Date(map.map.updated_at).toLocaleDateString("en-US")

    const [name, setName] = useState(default_name)


    return (
        <div className="map-card">
                <div className="map-info">
                    <h3>{name}</h3>
                    <h5>Saved {updatedAt} - Created {createdAt}</h5>
                </div>
        </div>
    )
}

export default MapCard

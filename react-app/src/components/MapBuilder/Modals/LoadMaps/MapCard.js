import { NavLink } from "react-router-dom"
import { useState } from "react"
import './MapCard.css'

const MapCard = (map, allMaps, setAllMaps) => {
    let currentMap = map.map
    let id = currentMap.id
    let default_name = currentMap.name
    let createdAt = new Date(map.map.created_at).toLocaleDateString("en-US")

    const [name, setName] = useState(default_name)


    return (
        <div className="map-card">
                <div className="map-info">
                    <div className="map-left-info">
                        <h4>{name}</h4>
                        <h5>Created {createdAt}</h5>
                    </div>
                    <div className="map-right-info">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
        </div>
    )
}

export default MapCard

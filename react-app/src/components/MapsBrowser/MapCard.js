import { NavLink } from "react-router-dom"
import './MapCard.css'

const MapCard = (map) => {
    let id = map.map.id
    let name = map.map.name
    let createdAt = new Date(map.map.created_at).toLocaleDateString("en-US")
    console.log(map)

    return (
        <div className="map-card">
            <NavLink to={`/maps/${id}`}>
                <div className="map-info">
                    <div className="map-left-info">
                        <h4>{name}</h4>
                        <h5>Created {createdAt}</h5>
                    </div>
                    <div className="map-right-info">
                        <h4>Edit - Delete</h4>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default MapCard

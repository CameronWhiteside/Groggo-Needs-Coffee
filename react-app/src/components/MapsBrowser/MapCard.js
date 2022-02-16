import { NavLink } from "react-router-dom"

const MapCard = (map) => {
    return (
        <>
            <NavLink to={`/maps/${map.map.id}`}>
                <h4>{map.map.name}</h4>
            </NavLink>
        </>
    )
}

export default MapCard

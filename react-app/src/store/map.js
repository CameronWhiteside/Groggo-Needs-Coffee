//action types
const LOAD_MAPS = 'map/LOAD_MAPS';
const DELETE_MAP = 'map/DELETE_MAP';
const ADD_MAP = 'map/ADD_MAP';
const EDIT_MAP = 'map/EDIT_MAP'

//action creators
const loadMaps = (maps) => ({
    type: LOAD_MAPS,
    maps
});

const deleteMap = (mapId) => ({
    type: DELETE_MAP,
    mapId
});

const addMap = (map) => ({
    type: ADD_MAP,
    map
});

const editMap = (map) => ({
    type: EDIT_MAP,
    map
})

//thunks
export const getMaps = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/maps/`);
    if (res.ok) {
        const maps = await res.json();
        dispatch(loadMaps(maps))
        return maps
    }
};

export const removeMap = (mapId) => async dispatch => {
    const res = await fetch(`/api/maps/${mapId}/`, {
        method: "DELETE"
    });

    if (res.ok) {
        const map = await res.json();
        dispatch(deleteMap(mapId));
        return map;
    }
};

export const createMap = (mapObject) => async dispatch => {
    const res = await fetch(`/api/users/${mapObject.userId}/maps/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(mapObject)
    })

    if (res.ok) {
        const newMap = await res.json();
        dispatch(addMap(newMap));
        return newMap;
    }
};

export const udpateMap = (mapObject) => async dispatch => {
    let mapId = mapObject.id

    const res = await fetch(`/api/maps/${mapId}/`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(mapObject)
    })

    if (res.ok) {
        const udpatedMap = await res.json();
        dispatch(editMap(udpatedMap));
        return editMap;
    }
};


//reducer
const initialState = {};

const mapReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_MAPS: {
            newState = { ...state }
            let foundMaps = action.maps.maps
            foundMaps.forEach(map => {
                newState[map.id] = map
                }
            )
            return newState;
        }

        case DELETE_MAP: {
            newState = { ...state };
            delete newState[action.mapId]
            return newState;

        }

        case ADD_MAP: {
            newState = { ...state }
            newState[action.map.id] = action.map
            return newState;
        }

        case EDIT_MAP: {
            newState = { ...state }
            newState[action.map.id] = action.map
            return newState;
        }

        default:
            return state;
    }
};

export default mapReducer;

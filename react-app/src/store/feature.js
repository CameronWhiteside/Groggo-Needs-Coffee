
//action types
const LOAD_FEATURES = 'feature/LOAD_FEATURES';
const DELETE_FEATURE = 'feature/DELETE_FEATURE';
const DELETE_MAP_FEATURES = 'feature/DELETE_MAP_FEATURES';
const ADD_FEATURE = 'feature/ADD_FEATURE';
const EDIT_FEATURE = 'feature/EDIT_FEATURE'

//action creators
const loadFeatures = (features) => ({
    type: LOAD_FEATURES,
    features
});

const deleteFeature = (featureId) => ({
    type: DELETE_FEATURE,
    featureId
});

const deleteMapFeatures = (mapId) => ({
    type: DELETE_MAP_FEATURES,
    mapId
});

const addFeature = (feature) => ({
    type: ADD_FEATURE,
    feature
});

const editFeature = (feature) => ({
    type: EDIT_FEATURE,
    feature
})

//thunks
export const getFeatures = (mapId) => async dispatch => {
    const res = await fetch(`/api/maps/${mapId}/features/`);
    if (res.ok) {
        const features = await res.json();
        console.log({ features })
        dispatch(loadFeatures(features))
        return features
    }
};

export const removeMapFeatures = (mapId) => async dispatch => {
    const res = await fetch(`/api/maps/${mapId}/features`, {
        method: "DELETE"
    });

    if (res.ok) {
        const map = await res.json();
        dispatch(deleteMapFeatures(mapId));
        return map;
    }
};

export const removeFeature = (mapId) => async dispatch => {
    const res = await fetch(`/api/maps/${mapId}/`, {
        method: "DELETE"
    });

    if (res.ok) {
        const map = await res.json();
        dispatch(deleteFeature(mapId));
        return map;
    }
};

export const createFeature = (mapObject) => async dispatch => {
    const res = await fetch(`/api/users/${mapObject.userId}/maps/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(mapObject)
    })

    if (res.ok) {
        const newFeature = await res.json();
        dispatch(addFeature(newFeature));
        return newFeature;
    }
};

export const updateFeature = (mapObject) => async dispatch => {
    let mapId = mapObject.id

    const res = await fetch(`/api/maps/${mapId}/`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(mapObject)
    })

    if (res.ok) {
        const updatedFeature = await res.json();
        dispatch(editFeature(updatedFeature));
        return updatedFeature;
    }
};


//reducer
const initialState = {};

const mapReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_FEATURES: {
            newState = { ...state }
            let foundFeatures = action.maps.maps
            foundFeatures.forEach(map => {
                newState[map.id] = map
                }
            )
            return newState;
        }

        case DELETE_FEATURE: {
            newState = { ...state };
            delete newState[action.featureId]
            return newState;

        }

        case DELETE_MAP_FEATURES: {
            return initialState
        }

        case ADD_FEATURE: {
            newState = { ...state }
            newState[action.map.id] = action.map
            return newState;
        }

        case EDIT_FEATURE: {
            newState = { ...state }
            newState[action.map.id] = action.map
            return newState;
        }

        default:
            return state;
    }
};

export default mapReducer;

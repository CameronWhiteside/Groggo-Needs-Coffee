
//action types
const LOAD_FEATURES = 'feature/LOAD_FEATURES';
const DELETE_FEATURE = 'feature/DELETE_FEATURE';
const DELETE_MAP_FEATURES = 'feature/DELETE_MAP_FEATURES';
const ADD_FEATURE = 'feature/ADD_FEATURE';
const EDIT_FEATURE = 'feature/EDIT_FEATURE';

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

//helper
const pythonify = (feature) => {
    let pyObj = {}
    pyObj['id'] = feature.id
    pyObj['map_id'] = feature.mapId
    pyObj['feature_type_id'] = feature.featureTypeId
    pyObj['start_latitude'] = feature.startLatitude || parseInt('0')
    pyObj['start_longitude'] = feature.startLongitude || parseInt('0')
    pyObj['stop_latitude'] = feature.stopLatitude || parseInt('0')
    pyObj['stop_longitude'] = feature.stopLongitude || parseInt('0')
    console.log({pyObj})
    return pyObj
}

//thunks
export const getFeatures = (mapId) => async dispatch => {
    const res = await fetch(`/api/maps/${mapId}/features/`);
    if (res.ok) {
        const features = await res.json();
        dispatch(loadFeatures(features))
        return features
    }
};

export const removeMapFeatures = (mapId) => async dispatch => {
    const res = await fetch(`/api/maps/${mapId}/features/`, {
        method: "DELETE"
    });

    if (res.ok) {
        const map = await res.json();
        dispatch(deleteMapFeatures(mapId));
        return map;
    }
};

export const removeFeature = (featureId) => async dispatch => {
    const res = await fetch(`/api/features/${featureId}/`, {
        method: "DELETE"
    });

    if (res.ok) {
        const feature = await res.json();
        dispatch(deleteFeature(featureId));
        return feature;
    }
};

export const createFeature = (featureObject) => async dispatch => {
    const res = await fetch(`/api/maps/${featureObject.mapId}/features/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pythonify(featureObject))
    })

    if (res.ok) {
        const newFeature = await res.json();
        dispatch(addFeature(newFeature.feature));
        return newFeature;
    }
};

export const updateFeature = (featureObject) => async dispatch => {
    let featureId = featureObject.id

    const res = await fetch(`/api/features/${featureId}/`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(featureObject)
    })

    if (res.ok) {
        const updatedFeature = await res.json();
        dispatch(editFeature(updatedFeature));
        return updatedFeature;
    }
};


//reducer
const initialState = {};

const featureReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_FEATURES: {
            newState = {}
            let foundFeatures = action.features.features
            console.log(`these found features`, foundFeatures)
            foundFeatures.forEach(feature => {
                console.log(`this is the feature`, feature)
                newState[feature.id] = feature
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
            newState[action.feature.id] = action.feature
            return newState;
        }

        case EDIT_FEATURE: {
            newState = { ...state }
            newState[action.feature.id] = action.feature
            return newState;
        }

        default:
            return state;
    }
};

export default featureReducer;

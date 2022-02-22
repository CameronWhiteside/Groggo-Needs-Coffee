import { addPathLine } from '../components/MapBuilder/utils'

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

//convert to python-parsable request body helper
const pythonify = (feature) => {
    let pyObj = {}
    pyObj['id'] = feature.id
    pyObj['map_id'] = feature.mapId
    pyObj['feature_type_id'] = feature.featureTypeId
    pyObj['start_latitude'] = feature.startLatitude || parseInt('0')
    pyObj['start_longitude'] = feature.startLongitude || parseInt('0')
    pyObj['stop_latitude'] = feature.stopLatitude || parseInt('0')
    pyObj['stop_longitude'] = feature.stopLongitude || parseInt('0')
    return pyObj
}

const jsFeature = (feature) => {
    let jsObj = {}
    jsObj.id = feature.id
    jsObj.mapId = feature.map_id
    jsObj.featureTypeId = feature.feature_type_id
    jsObj.startLatitude = feature.start_latitude
    jsObj.stopLatitude = feature.stop_latitude
    jsObj.startLongitude = feature.start_longitude
    jsObj.stopLongitude = feature.stop_longitude

    let nodes = {}
    if (feature.feature_type_id >= 3 && feature.feature_type_id <= 5) {
        let startId = `${feature.start_longitude}-${feature.start_latitude}`
        let stopId = `${feature.stop_longitude}-${feature.stop_latitude}`
        nodes[startId] = startId
        nodes[stopId] = stopId
        let start = document.getElementById(startId)
        let stop = document.getElementById(stopId)
        addPathLine(start, stop, 'road-display-layer', 'fake-street', 18)
    } else if (feature.feature_type_id === 6 || feature.feature_type_id === 7) {
            for (let x = feature.start_longitude; x <= feature.stop_longitude; x++) {
                for (let y = feature.start_latitude; y <= feature.stop_latitude; y++) {
                    nodes[`${x}-${y}`] = `${x}-${y}`
                }
            }
    }

    jsObj.nodes = nodes
    return jsObj
}

//thunks
export const getFeatures = (map) => async dispatch => {

    if (map && map.id) {
        let mapId = map.id
        const res = await fetch(`/api/maps/${mapId}/features/`);
        if (res.ok) {
            const features = await res.json();
            let jsFeatures = { 'features': features.features.map(feature => jsFeature(feature)) }
            dispatch(loadFeatures(jsFeatures))
            return jsFeatures
        }
    } else {
        return {}
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
        let newJsFeature = jsFeature(newFeature.feature)
        dispatch(addFeature(newJsFeature));
        // console.log(newJsFeature)
        return newJsFeature;
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
        let newJsFeature = { 'feature': jsFeature(updatedFeature.feature) }
        dispatch(editFeature(newJsFeature));
        return newJsFeature;
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
            foundFeatures.forEach(feature => {
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

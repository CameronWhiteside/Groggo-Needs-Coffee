//action types
const UPDATE_PATH = 'pathfinder/SET_PATH';


//action creators
export const updatePathData = (data) => ({
    type: UPDATE_PATH,
    data
})

//reducer

const pathfinderReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_PATH: {
            return action.data
        }

        default:
            return state;
    }
};

export default pathfinderReducer;

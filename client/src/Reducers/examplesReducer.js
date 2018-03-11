import { exampleCreated, exampleDeleted } from "../Actions/actionTypes";

const initialState = { example_created: null, example_deleted: null};

const examplesReducer = (state = initialState, action) => {
  switch (action.type) {
    case exampleCreated:
	    state = Object.assign({}, state, { example_created: action.data, loading:false });
	    return state;
    case exampleDeleted:
      state = Object.assign({}, state, { example_deleted: action.data, loading:false });
      return state;
    default:
      return state;
  }
};

export default examplesReducer;